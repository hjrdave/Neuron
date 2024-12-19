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

export class NeuronClient<F> implements INeuronClient<F> {
  neuron: ReactClientNeuron<F>;
  useNeuron: DynamicNeuronHook;
  readonly name?: ClientName;
  readonly connect: ConnectToClient<F>;
  constructor(options?: ClientOptions) {
    const client = new NeuronClientCore<F>(options);
    this.name = options?.name;
    const modules = options?.modules;
    //neuron and weak neuron need work
    this.neuron = <T, A>(initialState: T, options?: NeuronOptions<T, A, F>) =>
      _neuron(initialState, options, modules, client.neuron);
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

interface INeuronClient<F> {
  readonly name?: Readonly<ClientName>;
  readonly connect: ConnectToClient<F>;
  readonly neuron: ReactClientNeuron<F>;
  readonly useNeuron: DynamicNeuronHook;
}
export interface ClientOptions {
  name?: ClientName;
  modules?: IModule<unknown>[];
}
export type ReactClientNeuron<F> = <T, A>(
  initialState: T,
  options?: NeuronOptions<T, A, F>
) => <S>(
  slice?: ((state: T) => S) | undefined
) => [StateOrSlice<S, T>, Actions<T, S, A>];
