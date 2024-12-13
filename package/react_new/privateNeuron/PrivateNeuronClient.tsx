import { createContext, ReactNode, useContext } from "react";
import { IModule } from "../../core/Module";
import { NeuronOptions } from "../../core/Neuron";
import {
  ClientName,
  INeuronClient,
  NeuronClient,
} from "../../core/NeuronClient";
import {
  Actions,
  StateOrSlice,
  usePrivateSubscriber,
} from "./usePrivateSubscriber";

export class PrivateNeuronClient<F> implements IPrivateNeuronClient<F> {
  private clientContext: React.Context<INeuronClient<F>>;
  private modules: IModule<unknown>[];
  readonly privateNeuron = <T, A>(
    initialState: T,
    options?: NeuronOptions<T, A, F>
  ) => {
    const neuronKey = options?.key ?? crypto.randomUUID();
    const useinitNeuron = (client: INeuronClient<F>) => {
      client.neuron(initialState, { ...options, key: neuronKey });
    };
    const useNeuron = <S,>(slice?: (state: T) => S) => {
      const client = useContext(this.clientContext);
      return usePrivateSubscriber<T, A, F, S>(client, neuronKey, slice);
    };
    return [useinitNeuron, useNeuron] as [
      typeof useinitNeuron,
      typeof useNeuron
    ];
  };
  readonly useNeuronClient = (options?: { name?: ClientName }) => {
    const client = new NeuronClient<F>({
      name: options?.name,
      modules: this.modules,
    });
    const Private = ({ children }: PrivateProps) => {
      const Context = this.clientContext;
      return <Context.Provider value={client}>{children}</Context.Provider>;
    };
    return { client, Private };
  };
  constructor(options?: ClientOptions) {
    this.modules = options?.modules ?? [];
    this.clientContext = createContext(null) as unknown as React.Context<
      INeuronClient<F>
    >;
  }
}

interface IPrivateNeuronClient<F> {
  privateNeuron: <T, A>(
    initialState: T,
    options?: NeuronOptions<T, A, F>
  ) => (
    | ((client: INeuronClient<F>) => void)
    | (<S>(slice?: (state: T) => S) => [StateOrSlice<S, T>, Actions<T, S, A>])
  )[];
  useNeuronClient: (options?: { name?: ClientName }) => {
    client: NeuronClient<F>;
    Private: ({ children }: PrivateProps) => JSX.Element;
  };
}
interface ClientOptions {
  modules?: IModule<unknown>[];
}
interface PrivateProps {
  children?: ReactNode;
}
