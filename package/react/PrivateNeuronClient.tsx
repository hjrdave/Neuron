import { createContext, ReactNode, useContext } from "react";
import {
  ClientName,
  INeuronClient,
  NeuronClient,
  NeuronOptions,
  IModule,
} from "../core";
import {
  Actions,
  StateOrSlice,
  usePrivateSubscriber,
} from "./usePrivateSubscriber";

export class PrivateNeuronClient implements IPrivateNeuronClient {
  private clientContext: React.Context<INeuronClient>;
  private modules: IModule[];
  readonly privateNeuron = <T, A = unknown>(
    initialState: T,
    options?: NeuronOptions<T, A>
  ) => {
    const neuronKey = options?.key ?? crypto.randomUUID();
    const useinitNeuron = (client: INeuronClient) => {
      client.neuron(initialState, { ...options, key: neuronKey });
    };
    const useNeuron = <S,>(slice?: (state: T) => S) => {
      const client = useContext(this.clientContext);
      return usePrivateSubscriber<T, A, S>(client, neuronKey, slice);
    };
    return [useinitNeuron, useNeuron] as [
      typeof useinitNeuron,
      typeof useNeuron
    ];
  };
  readonly useNeuronClient = (options?: { name?: ClientName }) => {
    const client = new NeuronClient({
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
    this.clientContext = createContext(
      null
    ) as unknown as React.Context<INeuronClient>;
  }
}

interface IPrivateNeuronClient {
  privateNeuron: <T, A>(
    initialState: T,
    options?: NeuronOptions<T, A>
  ) => (
    | ((client: INeuronClient) => void)
    | (<S>(slice?: (state: T) => S) => [StateOrSlice<S, T>, Actions<T, S, A>])
  )[];
  useNeuronClient: (options?: { name?: ClientName }) => {
    client: NeuronClient;
    Private: ({ children }: PrivateProps) => JSX.Element;
  };
}
interface ClientOptions {
  modules?: IModule[];
}
interface PrivateProps {
  children?: ReactNode;
}
