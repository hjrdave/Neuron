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
      prevState: neuronData?.prevState,
    });
    mutator(payload);
    this.clientModules.forEach((module) => {
      module?.onDispatch?.(payload as IPayload<unknown, F>);
    });
    neuronData?.onDispatch?.(payload);
    this.clientStore.set(key, {
      ...neuronData,
      state: payload.state,
      prevState: payload?.prevState,
    } as NeuronData<unknown, unknown, F>);
    this.clientDispatcher.dispatch(payload);
    this.clientModules.forEach((module) => {
      module?.onCallback?.(payload as IPayload<unknown, F>);
    });
    neuronData?.onCallback?.(payload);
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

/**
 * Interface for a NeuronClient, a container for managing multiple Neurons and their states.
 *
 * @template F - The type of additional features or metadata associated with the client.
 */
export interface INeuronClient<F> {
  /**
   * The name of the NeuronClient instance.
   */
  readonly name: Readonly<ClientName>;

  /**
   * Checks if a specific state exists in the client store.
   *
   * @param key - The unique key associated with the state item.
   * @returns `true` if the state exists, otherwise `false`.
   */
  readonly has: (key: NeuronKey) => boolean;

  /**
   * Returns a reference to the state value associated with the provided key.
   *
   * @template T - The type of the state value.
   * @param key - The unique key associated with the state item.
   * @returns The state value as a reference.
   */
  readonly getRef: <T>(key: NeuronKey) => T;

  /**
   * Returns a snapshot of all state items in the client store.
   *
   * @returns An array of objects containing the key and state for each item.
   */
  readonly getSnapshot: () => {
    key: NeuronKey;
    state: unknown;
  }[];

  /**
   * Registers a callback function that will be executed whenever a Neuron's state is updated.
   *
   * @param callbackFn - The callback function to invoke on state updates. Receives the payload for inspection.
   */
  readonly listen: (callbackFn: DispatchCallback<unknown, F>) => void;

  /**
   * Dispatches a mutator function for updating the state associated with a specific key.
   *
   * @param key - The unique key associated with the state item to update.
   * @param mutator - A function that manipulates the state through a payload.
   */
  readonly dispatch: (
    key: NeuronKey,
    mutator: DispatchMutator<unknown, F>
  ) => void;

  /**
   * Creates a new Neuron instance within the client.
   *
   * @template T - The type of the Neuron's state.
   * @template A - The type of the Neuron's actions.
   * @param initialState - The initial state of the Neuron.
   * @param options - Configuration options for the Neuron.
   * @returns A new instance of the Neuron.
   */
  readonly neuron: <T, A>(
    initialState: T,
    options?: NeuronOptions<T, A, F>
  ) => INeuron<T, A, F>;

  /**
   * Provides access to the NeuronClient without the `connect` method.
   */
  readonly connect: ConnectToClient<F>;
}

/**
 * Configuration options for a NeuronClient instance.
 */
export interface ClientOptions {
  /**
   * The name of the NeuronClient instance.
   */
  name?: NeuronKey;

  /**
   * An array of modules to associate with the NeuronClient.
   */
  modules?: IModule<unknown>[];
}

/**
 * The name type for a NeuronClient, which can be a string or number.
 */
export type ClientName = string | number;

/**
 * Represents a connected NeuronClient with all its methods except `connect`.
 *
 * @template F - The type of additional features or metadata associated with the client.
 */
export type ConnectToClient<F> = Omit<INeuronClient<F>, "connect">;

/**
 * Represents the client store as a map of keys to NeuronData objects.
 *
 * @template T - The type of the Neuron's state.
 * @template A - The type of the Neuron's actions.
 * @template F - The type of additional features or metadata associated with the Neuron.
 */
export type ClientStore<T, A, F> = Map<NeuronKey, NeuronData<T, A, F>>;
