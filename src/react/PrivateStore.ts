import React, { useContext, createContext } from "react";
import { default as Core, Module, DispatchMutator } from "../core";
import { Selector } from "../slices";
import Store from "./Store";
import Private from "./Private";
import { UseStore } from "./useStore";
import { UseNeuron } from "./useNeuron";
import { UseDispatch } from "./useDispatch";

interface IContext<S = { [key: string]: unknown }> {
  useNeuron: UseNeuron<S>;
  useDispatch: UseDispatch<S>;
  useStore: UseStore<S>;
}

export default class PrivateStore<S = { [key: string]: unknown }, M = unknown> {
  private options?: { modules?: Module<unknown, S>[] };
  private Context: React.Context<IContext<S>>;
  private ContextState: IContext<S>;

  usePrivateStore = () => {
    const storeInstance = new Store<S, M>(this.options);
    this.ContextState = {
      useNeuron: storeInstance.useNeuron as any,
      useDispatch: storeInstance.useDispatch,
      useStore: storeInstance.useStore,
    };
    return storeInstance;
  };

  Private = (props: { children?: React.ReactNode }) =>
    Private({
      context: this.Context,
      children: props.children,
      useNeuron: this.ContextState.useNeuron,
      useDispatch: this.ContextState.useDispatch,
      useStore: this.ContextState.useStore,
    });

  useNeuron = <T = unknown, A = { [key: string]: unknown }>(
    selector: Core.SelectorKey<S> | Selector<S, T>
  ) => {
    try {
      const context = useContext(this.Context);
      return context?.useNeuron<T, A>(selector as any);
    } catch (err) {
      console.error(
        console.error(
          `NeuronGSM: Protected store hooks cannot be called outside of protected store scope.`
        ),
        err
      );
    }
  };

  useDispatch = <T = unknown, D = { [key: string]: unknown }>(
    selector: Core.SelectorKey<S>
  ) => {
    try {
      const context = useContext(this.Context);
      return (mutator: DispatchMutator<T, S, D>) =>
        context?.useDispatch<T>(selector, mutator as any);
    } catch (err) {
      console.error(
        console.error(
          `NeuronGSM: Protected store hooks cannot be called outside of scope.`
        ),
        err
      );
    }
  };

  useStore = (Store: Core.Store<S>) => {
    try {
      const context = useContext(this.Context);
      return context?.useStore(Store);
    } catch (err) {
      console.error(
        console.error(
          `NeuronGSM: Protected store hooks cannot be called outside of scope.`
        ),
        err
      );
    }
  };

  public constructor(options?: { modules?: Module<unknown, S>[] }) {
    this.Context = createContext(null as any);
    this.options = options;
    this.ContextState = {
      useNeuron: undefined as any,
      useDispatch: undefined as any,
      useStore: undefined as any,
    };
  }
}
