import React, { useContext, createContext } from "react";
import type { Module } from "../vanilla";
import type { Selector } from "../slices";
import { Store } from "./Store";
import { Private } from "./Private";
import type { UseNeuron } from "./useNeuron";
import type { UseDispatch } from "./useDispatch";
import { DispatchMutator } from "../vanilla/Interfaces";

interface IContext<S, A> {
  useNeuron: UseNeuron<S, A>;
  useDispatch: UseDispatch<S, A>;
}
export interface IPrivateStore<S, A> {
  readonly usePrivateStore: () => void;
  readonly Private: (props: { children?: React.ReactNode }) => JSX.Element;
  readonly useNeuron: UseNeuron<S, A>;
  readonly useDispatch: UseDispatch<S, A>;
}
export class PrivateStore<S, A> implements IPrivateStore<S, A> {
  private options?: { modules?: Module<S, A>[] };
  private Context: React.Context<IContext<S, A>>;
  private ContextState: IContext<S, A>;

  usePrivateStore = () => {
    const storeInstance = new Store<S, A>(this.options);
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

  useNeuron = (<SelectorKey extends keyof S>(
    selector: SelectorKey | Selector<unknown, S>
  ) => {
    const context = useContext(this.Context);
    if (context === undefined || context === null) {
      console.error(`Neuron: Private store hooks must be called in scope.`);
    }
    return context?.useNeuron(selector);
  }) as UseNeuron<S, A>;

  useDispatch = <SelectorKey extends keyof S>(selector: SelectorKey) => {
    try {
      const context = useContext(this.Context);
      return (mutator: DispatchMutator<S, A, SelectorKey>) =>
        context?.useDispatch(selector, mutator);
    } catch (err) {
      console.error(
        console.error(`Neuron: Private store hooks must be called in scope.`),
        err
      );
    }
  };

  public constructor(options?: { modules?: Module<S, A>[] }) {
    this.Context = createContext(null) as unknown as React.Context<
      IContext<S, A>
    >;
    this.options = options;
    this.ContextState = {
      useNeuron: undefined as unknown as UseNeuron<S, A>,
      useDispatch: undefined as unknown as UseDispatch<S, A>,
    };
  }
}
