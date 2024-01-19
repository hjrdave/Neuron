import React, { useContext, createContext } from "react";
import type { Module } from "../vanilla";
import type { Selector } from "../slices";
import { Store } from "./Store";
import { Private } from "./Private";
import type { UseNeuron } from "./useNeuron";
import type { UseDispatch } from "./useDispatch";
import type { StateProps } from "./State";
import type { ModuleProps } from "./Module";
import {
  ActionProps,
  DataProps,
  SelectorKey,
  DispatchMutator,
} from "../vanilla/Interfaces";

interface IContext<S = { [key: string]: unknown }> {
  useNeuron: UseNeuron<S>;
  useDispatch: UseDispatch<S>;
}
export type UsePrivateNeuron<S = StateProps> = <T = unknown, A = ActionProps>(
  selector: SelectorKey<S> | Selector<S, T>
) => [T, (value: T | ((prevState: T) => T)) => void, A] | undefined;
export interface IPrivateStore<S> {
  readonly usePrivateStore: () => void;
  readonly Private: (props: { children?: React.ReactNode }) => JSX.Element;
  readonly useNeuron: UsePrivateNeuron<S>;
  readonly useDispatch: UseDispatch<S>;
}
export class PrivateStore<S = StateProps, M = ModuleProps>
  implements IPrivateStore<S>
{
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

  useNeuron = <T = unknown, A = ActionProps>(
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

  useDispatch = <T = unknown, D = DataProps>(selector: SelectorKey<S>) => {
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
