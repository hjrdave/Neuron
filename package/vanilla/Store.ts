import { Dispatcher } from "./Dispatcher";
import type { IDispatcher } from "./Dispatcher";
import { Payload } from "./Payload";
import { IPayload } from "./Payload";
import { Interceptor } from "./Interceptor";
import type { IModule } from "./Module";
import { InterceptorTypes } from "./Interfaces";
import type {
  StoreItem,
  SelectorKey,
  Features,
  Actions,
  StoreProps,
  StateType,
  DataProps,
  ActionProps,
  DispatchCallback,
  DispatchMutator,
  GetState,
  SetState,
  GetStore,
  AddState,
  DispatchPayload,
  OnDispatch,
  UseModule,
  GetActions,
  HasState,
  ResetState,
} from "./Interfaces";

export interface Params {
  modules?: IModule[];
}
export interface IStore<S = StoreProps> {
  readonly use: UseModule;
  readonly getStore: GetStore<unknown, S>;
  readonly add: AddState<S>;
  readonly get: GetState<S>;
  readonly getActions: GetActions<S>;
  readonly set: SetState<S>;
  readonly has: HasState<S>;
  readonly reset: ResetState<S>;
  readonly dispatch: DispatchPayload<S>;
  readonly onDispatch: OnDispatch<S>;
}

export class Store<S = StoreProps> implements IStore<S> {
  private stateInventory: Map<SelectorKey<S>, StateType>;
  private initialStateInventory: Map<SelectorKey<S>, StateType>;
  private featureInventory: Map<SelectorKey<S>, Features<StateType, S>>;
  private actionsInventory: Map<
    SelectorKey<S>,
    Actions<ActionProps, StateType, S>
  >;
  private moduleInventory: Map<string, IModule>;
  private dispatcher: IDispatcher<S>;

  //runs payload through interceptor and then dispatches
  private dispatchPayload = <T = StateType, D = DataProps>(
    payload: IPayload<T, S, D>,
    type?: InterceptorTypes
  ) => {
    const interceptor = new Interceptor<T, S, D>({
      payload: payload,
      modules: this.moduleInventory as unknown as Map<string, IModule>,
    });
    type === InterceptorTypes.OnLoad
      ? interceptor.onload()
      : interceptor.onRun();
    if (
      interceptor.isStateNotPrevState_PrimitiveCheckOnly() &&
      interceptor.isStateNotNullOrUndefined()
    ) {
      if (!payload.isDispatchCancelled()) {
        this.dispatcher.dispatch(payload as IPayload<unknown, S, DataProps>);
        this.stateInventory.set(payload.key, payload.state);
      }
    }
    type === InterceptorTypes.OnLoad ? null : interceptor.onCallback();
  };

  //creates basic payload with default information
  private createPayload = <T = StateType, D = DataProps>(
    params: StoreItem<T, S>
  ) => {
    const payload = new Payload<T, S, D>({
      key: params.key,
      prevState: this.stateInventory.get(params.key) as T,
      state: params.state,
      features: params.features ?? this.featureInventory.get(params.key),
      get: this.get,
      set: this.set,
      reset: this.reset,
      getStore: this.getStore,
    });
    return payload;
  };

  /**
   * Includes modules into store. Modules can be used to extend Neuron stores, with new features and functionality. Modules should be included above store item add methods.
   * @param {Module} module - imported module object
   */
  readonly use = (module: IModule) =>
    this.moduleInventory.set(module.name, module);

  /**
   * Returns an array of store items.
   */
  readonly getStore = () =>
    Array.from(this.stateInventory.entries()).map(([key, state]) => ({
      key,
      state,
      actions: this.actionsInventory.get(key),
      features: this.featureInventory.get(key),
    }));

  /**
   * Instantiates a store item.
   * @param {StoreItem} storeItem - object that sets key, initial state, and features.
   */
  readonly add = <T = StateType, A = ActionProps>({
    key,
    state,
    actions,
    features,
  }: StoreItem<T, S, A>) => {
    if (!this.stateInventory.has(key)) {
      const payload = this.createPayload<T>({
        key: key,
        state: state,
        features: features,
      });
      this.initialStateInventory.set(payload.key, payload.state);
      features
        ? this.featureInventory.set(
            payload.key,
            features as Features<unknown, S>
          )
        : null;
      actions
        ? this.actionsInventory.set(
            payload.key,
            actions as Actions<ActionProps, unknown, S>
          )
        : null;
      this.dispatchPayload(payload, InterceptorTypes.OnLoad);
    }
  };

  /**
   * Get the current state from a store item.
   * Selected state is immutable.
   * @param {string} selector - key of the store item you want to select.
   */
  readonly get = <T = StateType>(selector: SelectorKey<S>) => {
    const state = this.stateInventory.get(selector) as T;
    const clonedState = structuredClone?.(state) ?? state;
    return clonedState;
  };

  /**
   * Get actions from a store item.
   * @param {string} selector - key of the store item you want to select.
   */
  readonly getActions = <A = ActionProps, T = StateType>(
    selector: SelectorKey<S>
  ) => {
    const dispatch = (mutator: DispatchMutator<T, S>) =>
      this.dispatch(selector, mutator);
    return (this.actionsInventory.get(selector)?.(dispatch) ?? {}) as A;
  };

  /**
   * Set new state to store item.
   * @param {string} selector - Store item key that the new state will be saved to.
   * @param {T | (prevState: T) => T} newState - New state that will be saved to the store.
   */
  readonly set = <T = StateType>(
    selector: SelectorKey<S>,
    newState: T | ((prevState: T) => T)
  ) => {
    if (this.stateInventory.has(selector)) {
      const prevState = this.get<T>(selector),
        payload = this.createPayload<T>({
          key: selector,
          state: (typeof newState === "function"
            ? (newState as (prevState: T) => T)?.(prevState)
            : newState) as T,
        });
      this.dispatchPayload<T>(payload);
    }
  };

  /**
   * Checks to see if store item exists.
   * @param {string} key - key of the store item you want to select.
   */
  readonly has = (key: SelectorKey<S>) => this.stateInventory.has(key);

  /**
   * Used to reset store item state to initial state. Resets state individually if a key is passed to it.
   * If no key is passed then it will reset all state.
   * @param {string} key - key of the store item you want to reset.
   */
  readonly reset = (key?: SelectorKey<S>) =>
    key
      ? this.set(key, this.initialStateInventory.get(key))
      : this.initialStateInventory.forEach((_, key) =>
          this.set(key, this.initialStateInventory.get(key))
        );

  /**
   * Dispatches a data object to a store item. This can be used to create a new state with middleware.
   * @param {string} key - key of the store item you want to select.
   * @param {T} data - data object that can be passed to store middleware.
   */
  readonly dispatch = <T = StateType, D = DataProps>(
    key: SelectorKey<S>,
    mutator: DispatchMutator<T, S, D>
  ) => {
    const payload = this.createPayload<T, D>({
      key: key,
    } as { key: SelectorKey<S>; state: T });
    mutator(payload);
    this.dispatchPayload<T, D>(payload);
  };

  /**
   * This function will fire anytime there is a store change. This is used to make state reactive.
   * @param {(payload) => void} callback - key of the store item you want to select.
   */
  readonly onDispatch = (callback: DispatchCallback<S>) => {
    this.stateInventory.forEach((_, key) => this.dispatcher.stopListening(key));
    this.stateInventory.forEach((_, key) =>
      this.dispatcher.listen(key, callback)
    );
  };

  constructor(params?: Params) {
    this.stateInventory = new Map();
    this.initialStateInventory = new Map();
    this.featureInventory = new Map();
    this.actionsInventory = new Map();
    this.moduleInventory = new Map();
    this.dispatcher = new Dispatcher();
    params?.modules?.forEach((module) => this.use(module));
  }
}
