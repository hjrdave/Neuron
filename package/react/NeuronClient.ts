import {
  IModule,
  NeuronOptions,
  ClientName,
  ClientMethods,
  NeuronClient as NeuronClientCore,
  NeuronKey,
} from "../core";
import { neuron as _neuron } from "./neuron";
import { DynamicNeuronHook, useNeuron } from "./useNeuron";
import { Actions, StateOrSlice } from "./useSubscriber";

export class NeuronClient implements INeuronClient {
  neuron: ReactClientNeuron;
  useNeuron = <T = unknown>(neuronKey: NeuronKey) =>
    useNeuron<T>(neuronKey, this.client);
  readonly name?: ClientName;
  readonly client: ClientMethods;
  constructor(options?: ClientOptions) {
    const client = new NeuronClientCore(options);
    this.name = options?.name;
    const modules = options?.modules;
    //neuron and weak neuron need work
    this.neuron = <T, A>(initialState: T, options?: NeuronOptions<T, A>) =>
      _neuron(initialState, { modules: modules, ...options }, client.neuron);
    this.client = {
      name: client.name,
      has: client.has,
      getRef: client.getRef,
      getSnapshot: client.getSnapshot,
      listen: client.listen,
      dispatch: client.dispatch,
      neuron: client.neuron,
      getActions: client.getActions,
      remove: client.remove,
    };
  }
}

interface INeuronClient {
  readonly name?: Readonly<ClientName>;
  readonly client: ClientMethods;
  readonly neuron: ReactClientNeuron;
  readonly useNeuron: DynamicNeuronHook;
}
export interface ClientOptions {
  name?: ClientName;
  modules?: IModule[];
}
export type ReactClientNeuron = <T, A = unknown>(
  initialState: T,
  options?: NeuronOptions<T, A>
) => <S>(
  slice?: ((state: T) => S) | undefined
) => [StateOrSlice<S, T>, Actions<T, S, A>];
