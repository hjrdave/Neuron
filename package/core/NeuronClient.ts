import {
  DispatchCallback,
  Dispatcher,
  DispatchMutator,
  IDispatcher,
} from "./Dispatcher";
import { IModule } from "./Module";
import {
  INeuron,
  Neuron,
  NeuronData,
  NeuronKey,
  NeuronOptions,
} from "./Neuron";
import { IPayload, Payload } from "./Payload";

export class NeuronClient<F> implements INeuronClient<F> {
  private clientStore: ClientStore<unknown, unknown, F>;
  private clientModules: IModule<F>[];
  private clientDispatcher: IDispatcher<unknown, F>;
  readonly name: ClientName;
  readonly has = (key: NeuronKey) => this.clientStore.has(key);
  readonly getRef = <T>(key: NeuronKey) =>
    this.clientStore.get(key)?.state as T;
  readonly getSnapshot = () =>
    Array.from(this.clientStore.entries()).map((item) => ({
      key: item[1].key,
      state: item[1].state,
    }));
  readonly listen = (callbackFn: DispatchCallback<unknown, F>) => {
    this.clientStore.forEach((_, key) => {
      this.clientDispatcher.stopListening(key);
    });
    this.clientStore.forEach((_, key) => {
      this.clientDispatcher.listen(key, callbackFn);
    });
  };
  readonly dispatch = (
    key: NeuronKey,
    mutator: DispatchMutator<unknown, F>
  ) => {
    const neuronData = this.clientStore.get(key) as NeuronData<
      unknown,
      unknown,
      F
    >;
    const payload = new Payload<unknown, F>({
      key: key,
      state: neuronData?.state,
      prevState: neuronData.prevState,
    });
    mutator(payload);
    this.clientModules.forEach((module) => {
      module?.onDispatch?.(payload as IPayload<unknown, F>, this.clientStore);
    });
    neuronData?.onDispatch?.(payload, this.clientStore);
    this.clientStore.set(key, {
      ...neuronData,
      state: payload.state,
      prevState: payload?.prevState,
    } as NeuronData<unknown, unknown, F>);
    this.clientDispatcher.dispatch(payload);
    this.clientModules.forEach((module) => {
      module?.onCallback?.(payload as IPayload<unknown, F>, this.clientStore);
    });
    neuronData?.onCallback?.(payload, this.clientStore);
  };
  readonly neuron = <T, A>(
    initialState: T,
    options?: NeuronOptions<T, A, F>
  ) => {
    return new Neuron<T, A, F>(
      initialState,
      options,
      this.clientModules,
      this.clientStore,
      this.clientDispatcher as IDispatcher<T, F>
    );
  };
  readonly connect: Omit<INeuronClient<F>, "connect">;
  constructor(options?: ClientOptions) {
    this.name = options?.name ?? crypto.randomUUID();
    this.clientStore = new Map<NeuronKey, NeuronData<unknown, unknown, F>>();
    this.clientDispatcher = new Dispatcher();
    this.clientModules = options?.modules ?? [];
    this.connect = {
      name: this.name,
      has: this.has,
      getRef: this.getRef,
      getSnapshot: this.getSnapshot,
      listen: this.listen,
      dispatch: this.dispatch,
      neuron: this.neuron,
    };
  }
}

//NeuronClient Types and Interfaces
export interface INeuronClient<F> {
  /**
   * NeuronClient instance name.
   */
  readonly name: Readonly<ClientName>;

  /**
   * Checks to see if state exists in NeuronClient
   * @param key - takes a client key that is associated to state item.
   */
  readonly has: (key: NeuronKey) => boolean;

  /**
   * Returns a reference to a state value by key
   * @param key - takes a client key that is associated to state item.
   */
  readonly getRef: <T>(key: NeuronKey) => T;

  /**
   * Returns array of state items
   */
  readonly getSnapshot: () => {
    key: NeuronKey;
    state: unknown;
  }[];

  /**
   * Runs a callback function everytime a neuron's state is updated.
   * @param callbackFn - Callback function that takes payload for inspecting
   */
  readonly listen: (callbackfn: DispatchCallback<unknown, F>) => void;

  readonly dispatch: (
    key: NeuronKey,
    mutator: DispatchMutator<unknown, F>
  ) => void;
  readonly neuron: <T, A>(
    initialState: T,
    options?: NeuronOptions<T, A, F>
  ) => INeuron<T, A, F>;
  readonly connect: ConnectToClient<F>;
}
export interface ClientOptions {
  name?: NeuronKey;
  modules?: IModule<unknown>[];
}
export type ClientName = string | number;
export type ConnectToClient<F> = Omit<INeuronClient<F>, "connect">;
export type ClientStore<T, A, F> = Map<NeuronKey, NeuronData<T, A, F>>;
