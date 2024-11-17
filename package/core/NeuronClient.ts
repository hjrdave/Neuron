import { Module } from "./Module";
import {
  ClientName,
  NeuronKey,
  ClientOptions,
  INeuronClient,
  NeuronData,
  IDispatcher,
  IModule,
  NeuronInitOptions,
} from "./Interfaces";
import { Dispatcher } from "./Dispatcher";
import { Neuron } from "./neuron";

export class NeuronClient implements INeuronClient {
  private clientStore: Map<NeuronKey, NeuronData<unknown>>;
  private clientModules: IModule[];
  private clientDispatcher: IDispatcher<unknown>;

  /**
   * NeuronClient instance name.
   */
  readonly name: ClientName;

  /**
   * Checks to see if state exists in NeuronClient
   * @param key - takes a client key that is associated to state item.
   */
  readonly has = (key: NeuronKey) => this.clientStore.has(key);

  /**
   * Returns a reference to a state value by key
   * @param key - takes a client key that is associated to state item.
   */
  readonly getRef = <T>(key: NeuronKey) =>
    this.clientStore.get(key)?.state as T;

  /**
   * Returns an array of state items
   */
  readonly getShapshot = () =>
    Array.from(this.clientStore.entries()).map((item) => ({
      key: item[1].key,
      state: item[1].state,
    }));

  // readonly listen = (
  //   stateKey: StateKey,
  //   dispatchCallback: DispatchCallback
  // ) => {
  //   this.dispatcher.listen(stateKey, dispatchCallback);
  // };

  // readonly dispatch = (key: StateKey, mutator: Mutator) => {

  // };

  // readonly connect = () => {};

  readonly init = <T>(initialState: T, options?: NeuronInitOptions<T>) =>
    new Neuron<T>(
      initialState,
      options,
      this.clientModules,
      this.clientStore,
      this.clientDispatcher as IDispatcher<T>
    );

  constructor(options?: ClientOptions) {
    this.name = options?.name ?? crypto.randomUUID();
    this.clientStore = new Map<NeuronKey, NeuronData<unknown>>();
    this.clientDispatcher = new Dispatcher();
    this.clientModules = options?.modules ?? [];
  }
}
