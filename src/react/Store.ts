import { Store as CoreStore, SelectorKey, Module as IModule } from "../core";
import { Selector } from "../slices";
import State, { StateProps } from "./State";
import Module, { ModuleProps } from "./Module";
import useNeuron from "./useNeuron";
import useDispatch from "./useDispatch";
import useStore from "./useStore";
import { StateType } from "../core/Core.interfaces";

export default class Store<S = { [key: string]: unknown }, M = unknown> {
  private Core: CoreStore<S>;

  Module = (props: ModuleProps<S>) =>
    Module({ ...props, ...{ Store: this.Core } });

  State = <T = unknown, A = { [key: string]: unknown }>(
    props: StateProps<T, A, S> & M
  ) => State<T, A, S, M>({ ...props, ...{ Store: this.Core } } as any);

  useNeuron = <T = unknown, A = { [key: string]: unknown }>(
    selector: SelectorKey<S> | Selector<S, T>
  ) => useNeuron<T, A, S>(selector as any, this.Core);

  useDispatch = <T = unknown, D = { [key: string]: any }>(
    selector: SelectorKey<S>
  ) => useDispatch<T, S, D>(selector, this.Core);

  useStore = () => useStore<S>(this.Core);

  public constructor(params?: { modules?: IModule<StateType, S>[] }) {
    this.Core = CoreStore<S>(params);
  }
}
