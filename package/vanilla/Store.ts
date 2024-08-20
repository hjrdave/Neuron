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
} from "./Interfaces";

export interface Params<S, A> {
  name?: string | number;
  modules?: IModule<S, A>[];
}
export interface IStore<
  S = { [key: string]: unknown },
  A = { [key: string]: unknown }
> {
  readonly name: string | number;
  readonly use: UseModule;
  readonly add: AddState<S, A, Features<S, A, SelectorKey<S>>>;
  readonly get: GetState<S>;
  readonly getRef: GetState<S>;
  readonly getActions: GetActions<A>;
  readonly getStore: GetStore<S, A>;
  readonly set: SetState<S>;
  readonly has: HasState<S>;
  readonly dispatch: DispatchPayload<S, A>;
  readonly onDispatch: OnDispatch<S, A>;
}

export class Store<
  S = { [key: string]: unknown },
  A = { [key: string]: unknown }
> implements IStore<S, A>
{
  private stateInventory: Map<SelectorKey<S>, S>;
  private featureInventory: Map<SelectorKey<S>, Features<S, A, SelectorKey<S>>>;
  private actionsInventory: Map<SelectorKey<A>, A>;
  private moduleInventory: Map<string, IModule<S, A>>;
  private dispatcher: IDispatcher<S, A, SelectorKey<S>>;

  //runs payload through interceptor and then dispatches
  private dispatchPayload = <SelectorKey extends keyof S>(
    payload: IPayload<S, A, SelectorKey>,
    type?: InterceptorTypes
  ) => {
    const interceptor = new Interceptor<S, A, SelectorKey>({
      payload: payload,
      modules: this.moduleInventory,
    });
    if (type === InterceptorTypes.OnLoad) {
      interceptor.onload();
    } else {
      interceptor.onRun();
    }
    if (
      interceptor.isStateNotPrevState_PrimitiveCheckOnly() &&
      interceptor.isStateNotNullOrUndefined()
    ) {
      if (!payload.isDispatchCancelled()) {
        this.dispatcher.dispatch(payload);
        this.stateInventory.set(
          payload.key as unknown as keyof S,
          payload.state as S
        );
      }
    }
    type === InterceptorTypes.OnLoad ? null : interceptor.onCallback();
  };

  //creates basic payload with default information
  private createPayload = <
    SelectorKey extends keyof S,
    ActionKey extends keyof A
  >(
    params: StoreItem<S, A, Features<S, A, SelectorKey>, SelectorKey, ActionKey>
  ) => {
    // @ts-expect-error - Payload props are missmatching expected props for some reason
    const payload = new Payload<S, A, SelectorKey>({
      key: params.key,
      prevState: this.stateInventory.get(params.key),
      state: params.state,
      features: params.features ?? this.featureInventory.get(params.key),
      get: this.get,
      set: this.set,
      getStore: this.getStore,
    });
    return payload;
  };

  /**
   * Name of store. Used for store identification in devtools. Value is randomly generated unless specifically set in options.
   */
  readonly name: number | string = Math.floor(
    Math.random() * 899999999 + 100000
  );

  /**
   * Includes modules into store. Modules can be used to extend Neuron stores, with new features and functionality. Modules should be included above store item add methods.
   * @param {Module} module - imported module object
   */
  readonly use = (module: IModule) =>
    this.moduleInventory.set(module.name, module as any);

  /**
   * Returns an array of store items.
   */
  readonly getStore = <
    SelectorKey extends keyof S,
    ActionKey extends keyof A
  >() =>
    Array.from(this.stateInventory.entries()).map(([key, state]) => ({
      key,
      state,
      actions: this.actionsInventory.get(key as unknown as keyof A),
      features: this.featureInventory.get(key),
    })) as StoreItem<
      S,
      A,
      Features<S, A, SelectorKey>,
      SelectorKey,
      ActionKey
    >[];

  /**
   * Instantiates a store item.
   * @param {StoreItem} storeItem - object that sets key, initial state, and features.
   */
  readonly add = <SelectorKey extends keyof S, ActionKey extends keyof A>({
    key,
    state,
    actions,
    features,
  }: StoreItem<S, A, Features<S, A, keyof S>, SelectorKey, ActionKey>) => {
    if (!this.stateInventory.has(key)) {
      const payload = this.createPayload({
        key: key,
        state: state,
        features: features,
      });
      features
        ? this.featureInventory.set(
            payload.key as unknown as keyof S,
            features as Features<S, A, keyof S>
          )
        : null;
      actions
        ? this.actionsInventory.set(
            payload.key as unknown as keyof A,
            actions as A
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
  readonly get = <SelectorKey extends keyof S>(selector: SelectorKey) => {
    const state = this.stateInventory.get(selector);
    const clonedState = structuredClone?.(state) ?? state;
    return clonedState as S[SelectorKey];
  };

  /**
   * Get the current state from a store item.
   * Selected state is a mutable reference.
   * @param {string} selector - key of the store item you want to select.
   */
  readonly getRef = <SelectorKey extends keyof S>(selector: SelectorKey) => {
    return this.stateInventory.get(selector) as S[SelectorKey];
  };

  /**
   * Get actions from a store item.
   * @param {string} selector - key of the store item you want to select.
   */
  readonly getActions = <ActionKey extends keyof A>(selector: ActionKey) => {
    const dispatch = (mutator: DispatchMutator<S, A, keyof S>) =>
      this.dispatch(selector as unknown as keyof S, mutator);
    // @ts-expect-error - type error for selector and also says no call signature even though there is one.
    return (this.actionsInventory.get(selector)?.(dispatch) ??
      {}) as A[ActionKey];
  };

  /**
   * Set new state to store item.
   * @param {string} selector - Store item key that the new state will be saved to.
   * @param {T | (prevState: T) => T} newState - New state that will be saved to the store.
   */
  readonly set = <SelectorKey extends keyof S>(
    selector: SelectorKey,
    newState: S[SelectorKey] | ((prevState: S[SelectorKey]) => S[SelectorKey])
  ) => {
    if (this.stateInventory.has(selector)) {
      const prevState = this.get(selector),
        payload = this.createPayload({
          key: selector,
          state:
            typeof newState === "function"
              ? (newState as (prevState: S[SelectorKey]) => S[SelectorKey])?.(
                  prevState
                )
              : newState,
        });
      this.dispatchPayload(payload);
    }
  };

  /**
   * Checks to see if store item exists.
   * @param {string} key - key of the store item you want to select.
   */
  readonly has = (key: SelectorKey<S>) => this.stateInventory.has(key);

  /**
   * Dispatches a data object to a store item. This can be used to create a new state with middleware.
   * @param {string} key - key of the store item you want to select.
   * @param {T} data - data object that can be passed to store middleware.
   */
  readonly dispatch = <SelectorKey extends keyof S>(
    key: SelectorKey,
    mutator: DispatchMutator<S, A, SelectorKey>
  ) => {
    const payload = this.createPayload({
      key: key,
    } as { key: SelectorKey; state: S[SelectorKey] });
    mutator(payload);
    this.dispatchPayload(payload);
  };

  /**
   * This function will fire anytime there is a store change. This is used to make state reactive.
   * @param {(payload) => void} callback - key of the store item you want to select.
   */
  readonly onDispatch = (callback: DispatchCallback<S, A, SelectorKey<S>>) => {
    this.stateInventory.forEach((_, key) => this.dispatcher.stopListening(key));
    this.stateInventory.forEach((_, key) =>
      this.dispatcher.listen(key, callback)
    );
  };

  constructor(params?: Params<S, A>) {
    this.stateInventory = new Map();
    this.featureInventory = new Map();
    this.actionsInventory = new Map();
    this.moduleInventory = new Map();
    this.dispatcher = new Dispatcher();
    params?.name !== undefined ? (this.name = params.name) : null;
    params?.modules?.forEach((module) =>
      this.use(module as unknown as IModule)
    );
  }
}
