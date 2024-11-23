import {
  Dispatch,
  DispatchCallback,
  Dispatcher,
  DispatchMutator,
  IDispatcher,
} from "./Dispatcher";
import { IModule } from "./Module";
import { ClientStore } from "./NeuronClient";
import { IPayload, Payload } from "./Payload";

/**
 * Individual Neuron that holds state and has methods to manipulate that state
 */
export class Neuron<T, A, F> implements INeuron<T, A, F> {
  readonly key: NeuronKey;
  private store: ClientStore<unknown, unknown, F>;
  private modules: IModule<F>[];
  private dispatcher: IDispatcher<T, F>;
  readonly set = (newState: T | ((prevState: T) => T)) => {
    const neuronData = this.store.get(this.key) as NeuronData<T, A, F>;
    const payload = new Payload<T, F>({
      key: this.key,
      prevState: neuronData.state as T,
      state:
        typeof newState === "function"
          ? (newState as (prevState: T) => T)(neuronData.state as T)
          : newState,
    });
    if (payload.state !== payload.prevState) {
      neuronData?.onDispatch?.(payload, this.store);
      for (let i = 0; i < this.modules.length; i++) {
        if (!payload.isDispatchCancelled()) {
          this.modules[i].onDispatch?.(
            payload as IPayload<unknown, F>,
            this.store
          );
          continue;
        }
        break;
      }
      if (!payload.isDispatchCancelled()) {
        this.store.set(this.key, {
          ...neuronData,
          state: payload.state,
          prevState: payload?.prevState,
        } as NeuronData<unknown, A, F>);
        this.dispatcher.dispatch(payload);
        neuronData?.onCallback?.(payload, this.store);
        this.modules.forEach((module) => {
          module?.onCallback?.(payload as IPayload<unknown, F>, this.store);
        });
      }
    }
  };
  readonly getClone = () => {
    const neuronState = this.store.get(this.key)?.state as T;
    if (structuredClone !== undefined || structuredClone !== null) {
      return structuredClone(neuronState);
    }
    return neuronState;
  };
  readonly getRef = () => this.store.get(this.key)?.state as T;
  readonly dispatch = (mutator: DispatchMutator<T, F>) => {
    const neuronData = this.store.get(this.key) as NeuronData<T, A, F>;
    const payload = new Payload<T, F>({
      key: this.key,
      state: neuronData?.state,
      prevState: neuronData.prevState,
    });
    mutator(payload);
    if (!payload.isDispatchCancelled()) {
      neuronData?.onDispatch?.(payload, this.store);
      for (let i = 0; i < this.modules.length; i++) {
        if (!payload.isDispatchCancelled()) {
          this.modules[i].onDispatch?.(
            payload as IPayload<unknown, F>,
            this.store
          );
          continue;
        }
        break;
      }
    }
    if (!payload.isDispatchCancelled()) {
      this.store.set(this.key, {
        ...neuronData,
        state: payload.state,
        prevState: payload?.prevState,
      } as NeuronData<unknown, A, F>);
      this.dispatcher.dispatch(payload);
      neuronData?.onCallback?.(payload, this.store);
      this.modules.forEach((module) => {
        module?.onCallback?.(payload as IPayload<unknown, F>, this.store);
      });
    }
  };
  readonly getActions = () => {
    const neuronActions = (this.store.get(this.key) as NeuronData<T, A, F>)
      ?.actions;
    return (neuronActions?.(this.dispatch) as A) ?? ({} as A);
  };
  readonly effect = (callbackFn: DispatchCallback<T, F>) => {
    this.dispatcher.stopListening(this.key);
    this.dispatcher.listen(this.key, callbackFn);
  };
  constructor(
    initialState: T,
    options?: NeuronOptions<T, A, F>,
    modules?: IModule<F>[],
    clientStore?: ClientStore<unknown, unknown, F>,
    dispatcher?: IDispatcher<T, F>
  ) {
    this.key = options?.key ?? crypto.randomUUID();
    this.store =
      clientStore ?? new Map<NeuronKey, NeuronData<unknown, unknown, F>>();
    this.modules = modules ?? [];
    this.dispatcher = dispatcher ?? new Dispatcher<T, F>();
    const payload = new Payload<T, F>({
      key: this.key,
      state: initialState,
      prevState: initialState,
    });
    options?.onInit?.(payload, this.store);
    this.modules.forEach((module) => {
      module?.onInit?.(payload as IPayload<unknown, F>, this.store);
    });
    this.store.set(payload.key, {
      ...options,
      key: payload.key,
      state: payload.state,
      prevState: payload.prevState,
    } as NeuronData<unknown, A, F>);
  }
}

//Neuron Types and Interfaces

export interface INeuron<T, A, F> {
  /**
   * Key that is associated to Neuron Data
   */
  readonly key: NeuronKey;

  /**
   * Updates Neuron state with new state
   * @param newState - State you want to update Neuron with
   */
  readonly set: (newState: T | ((prevState: T) => T)) => void;

  /**
   * Sends a mutator function to the Neuron client state for processing
   * @param mutator - Mutator function that allows for manipulating a payload
   */
  readonly dispatch: Dispatch<T, F>;

  /**
   * Gets a clone of the current state.
   */
  readonly getClone: () => T;

  /**
   * Gets a reference of the current state.
   */
  readonly getRef: () => T;

  /**
   * Runs a callback function everytime this neuron's state is updated.
   * @param callbackFn - Callback function that passes payload for inspecting
   */
  readonly effect: (callbackFn: DispatchCallback<T, F>) => void;

  /**
   * Returns neuron action methods.
   */
  readonly getActions: () => A;
}
export interface NeuronOptions<T, A, F> {
  key?: NeuronKey;
  features?: F;
  actions?: NeuronActions<T, A, F>;
  onInit?: NeuronMiddleware<T, F>;
  onDispatch?: NeuronMiddleware<T, F>;
  onCallback?: NeuronMiddleware<T, F>;
}
export interface NeuronData<T, A, F> {
  key: Readonly<NeuronKey>;
  state: T;
  prevState: Readonly<T>;
  actions?: NeuronActions<T, A, F>;
  onInit?: NeuronMiddleware<T, F>;
  onDispatch?: NeuronMiddleware<T, F>;
  onCallback?: NeuronMiddleware<T, F>;
}
export type NeuronMiddleware<T, F> = (
  payload: IPayload<T, F>,
  client: ClientStore<unknown, unknown, F>
) => void;
export type NeuronKey = string | number;
export type NeuronActions<T, A, F> = (dispatch: Dispatch<T, F>) => A;
