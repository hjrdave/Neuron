import {
  IModule,
  NeuronOptions,
  ClientName,
  ConnectToClient,
  NeuronClient as NeuronClientCore,
} from "../core";
import { neuron as _neuron } from "./neuron";
import { DynamicNeuronHook, useNeuron } from "./useNeuron";
import { Actions, StateOrSlice } from "./useSubscriber";

export class NeuronClient implements INeuronClient {
  neuron: ReactClientNeuron;
  useNeuron: DynamicNeuronHook;
  readonly name?: ClientName;
  readonly connect: ConnectToClient;
  constructor(options?: ClientOptions) {
    const client = new NeuronClientCore(options);
    this.name = options?.name;
    const modules = options?.modules;
    //neuron and weak neuron need work
    this.neuron = <T, A>(initialState: T, options?: NeuronOptions<T, A>) =>
      _neuron(initialState, { modules: modules, ...options }, client.neuron);
    this.useNeuron = useNeuron;
    this.connect = {
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
  readonly connect: ConnectToClient;
  readonly neuron: ReactClientNeuron;
  readonly useNeuron: DynamicNeuronHook;
}
export interface ClientOptions {
  name?: ClientName;
  modules?: IModule[];
}
export type ReactClientNeuron = <T, A>(
  initialState: T,
  options?: NeuronOptions<T, A>
) => <S>(
  slice?: ((state: T) => S) | undefined
) => [StateOrSlice<S, T>, Actions<T, S, A>];
