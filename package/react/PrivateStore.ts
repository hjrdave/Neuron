import React, { useContext, createContext } from "react";
import type { SelectorKey, Module, DispatchMutator } from "../vanilla";
import type { Selector } from "../slices";
import { Store } from "./Store";
import { Private } from "./Private";
import type { UseNeuron } from "./useNeuron";
import type { UseDispatch } from "./useDispatch";

interface IContext<S = { [key: string]: unknown }> {
  useNeuron: UseNeuron<S>;
  useDispatch: UseDispatch<S>;
}

export class PrivateStore<S = { [key: string]: unknown }, M = unknown> {
  private options?: { modules?: Module[] };
  private Context: React.Context<IContext<S>>;
  private ContextState: IContext<S>;

  usePrivateStore = () => {
    const storeInstance = new Store<S, M>(this.options);
    this.ContextState = {
      useNeuron: storeInstance.useNeuron,
      useDispatch: storeInstance.useDispatch,
    };
    return storeInstance;
  };

  Private = (props: { children?: React.ReactNode }) =>
    Private({
      context: this.Context,
      children: props.children,
      useNeuron: this.ContextState.useNeuron,
      useDispatch: this.ContextState.useDispatch,
    });

  useNeuron = <T = unknown, A = { [key: string]: unknown }>(
    selector: SelectorKey<S> | Selector<S, T>
  ) => {
    try {
      const context = useContext(this.Context);
      return context?.useNeuron<T, A>(selector);
    } catch (err) {
      console.error(
        console.error(`Neuron: Private store hooks must be called in scope.`),
        err
      );
    }
  };

  useDispatch = <T = unknown, D = { [key: string]: unknown }>(
    selector: SelectorKey<S>
  ) => {
    try {
      const context = useContext(this.Context);
      return (mutator: DispatchMutator<T, S, D>) =>
        context?.useDispatch<T>(selector, mutator as DispatchMutator<T, S>);
    } catch (err) {
      console.error(
        console.error(`Neuron: Private store hooks must be called in scope.`),
        err
      );
    }
  };

  public constructor(options?: { modules?: Module[] }) {
    this.Context = createContext(null) as unknown as React.Context<IContext<S>>;
    this.options = options;
    this.ContextState = {
      useNeuron: undefined as unknown as UseNeuron<S>,
      useDispatch: undefined as unknown as UseDispatch<S>,
    };
  }
}
