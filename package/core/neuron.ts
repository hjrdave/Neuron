import { Dispatcher } from "./Dispatcher";
import {
  DispatchMutator,
  IDispatcher,
  INeuron,
  NeuronKey,
  NeuronData,
  DispatchCallback,
  IModule,
  NeuronInitOptions,
} from "./Interfaces";
import { Payload } from "./Payload";

export class Neuron<T> implements INeuron<T> {
  private store: Map<NeuronKey, NeuronData<unknown>>;
  private modules: IModule[];
  private dispatcher: IDispatcher<T>;
  readonly key: NeuronKey;

  /**
   * Updates Neuron state with new state
   * @param newState - State you want to update Neuron with
   */
  readonly set = (newState: T) => {
    const currentStoreItem = this.store.get(this.key) as NeuronData<T>;
    const payload = new Payload<T>({
      key: this.key,
      prevState: currentStoreItem.state as T,
      state: newState,
    });
    currentStoreItem?.onRun?.(payload);
    const newStoreItem: NeuronData<T> = {
      ...currentStoreItem,
      state: payload.state,
      prevState: payload?.prevState,
    };
    this.store.set(this.key, newStoreItem as NeuronData<unknown>);
    this.dispatcher.dispatch(payload);
    currentStoreItem?.onCallback?.(payload);
  };

  /**
   * Gets a clone of the current state.
   */
  readonly getClone = () => {
    const currentState = this.store.get(this.key)?.state as T;
    if (structuredClone !== undefined || structuredClone !== null) {
      return structuredClone(currentState);
    }
    return currentState;
  };

  /**
   * Gets a reference of the current state.
   */
  readonly getRef = () => this.store.get(this.key)?.state as T;

  /**
   * Sends a mutator function to the Neuron client state for processing
   * @param mutator - Mutator function that allows for manipulating a payload
   */
  readonly dispatch = (mutator: DispatchMutator<T>) => {
    const currentStoreItem = this.store.get(this.key) as NeuronData<T>;
    const payload = new Payload<T | undefined>({
      key: this.key,
      state: currentStoreItem?.state,
      prevState: currentStoreItem.prevState,
    });
    mutator(payload); //interceptor
    currentStoreItem?.onRun?.(payload);
    this.store.set(this.key, {
      ...currentStoreItem,
      state: payload.state,
      prevState: payload?.prevState,
    } as NeuronData<unknown>);
    this.dispatcher.dispatch(payload);
    currentStoreItem?.onCallback?.(payload);
  };

  /**
   * Runs a callback function everytime state is updated.
   * @param callbackFn - Callback function that takes payload for inspecting
   */
  readonly effect = (callbackFn: DispatchCallback<T>) => {
    this.dispatcher.stopListening(this.key);
    this.dispatcher.listen(this.key, callbackFn);
  };

  constructor(
    initialState: T,
    options?: NeuronInitOptions<T>,
    modules?: IModule[],
    clientStore?: Map<NeuronKey, NeuronData<unknown>>,
    dispatcher?: IDispatcher<T>
  ) {
    this.key = options?.key ?? crypto.randomUUID();
    this.store = clientStore ?? new Map<NeuronKey, NeuronData<unknown>>();
    this.modules = modules ?? [];
    this.dispatcher = dispatcher ?? new Dispatcher<T>();
    const payload = new Payload<T>({
      key: this.key,
      state: initialState,
      prevState: initialState,
    });
    options?.onInit(payload);
    const initNeuronData: NeuronData<T> = {
      ...options,
      key: payload.key,
      state: payload.state,
      prevState: payload.prevState,
    };
    this.store.set(initNeuronData.key, initNeuronData as NeuronData<unknown>);
  }
}
