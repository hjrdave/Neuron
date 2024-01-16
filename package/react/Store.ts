import type { Store as ICoreStore } from "../vanilla";
import { Store as CoreStore } from "../vanilla/Store";
import type {
  SelectorKey,
  Module as IModule,
  DispatchCallback,
  StoreItem,
} from "../vanilla";
import type { Selector } from "../slices";
import { State } from "./State";
import type { StateProps } from "./State";
import { Module } from "./Module";
import type { ModuleProps } from "./Module";
import { useNeuron } from "./useNeuron";
import { useWeakNeuron } from "./useWeakNeuron";
import { useDispatch } from "./useDispatch";
import type { ActionProps } from "../vanilla/Interfaces";
export class Store<S = { [key: string]: unknown }, M = unknown> {
  private Core: ICoreStore<S>;

  Module = (props: ModuleProps) =>
    Module({ ...props, ...{ Store: this.Core } });

  State = <T = unknown, A = { [key: string]: unknown }>(
    props: StateProps<T, A, S> & M
  ) => State<T, A, S, M>({ ...props, ...{ Store: this.Core } });

  useNeuron = <T = unknown, A = { [key: string]: unknown }>(
    selector: SelectorKey<S> | Selector<S, T>
  ) => useNeuron<T, A, S>(selector, this.Core);

  useWeakNeuron = <T = unknown, A = { [key: string]: unknown }>(
    selector: string
  ) => useWeakNeuron<T, A, S>(selector as SelectorKey<unknown>, this.Core);

  useDispatch = <T = unknown, D = { [key: string]: unknown }>(
    selector: SelectorKey<S>
  ) => useDispatch<T, S, D>(selector, this.Core);

  setState = <T = unknown>(key: SelectorKey<S>, state: T) =>
    this.Core.set(key, state);

  getState = <T = unknown>(key: SelectorKey<S>) => this.Core.get<T>(key);

  addState = <T = unknown, A = ActionProps>(storeItem: StoreItem<T, S, A>) =>
    this.Core.add<T>(storeItem as StoreItem<T, S>);

  onDispatch = (callback: DispatchCallback<S>) =>
    this.Core.onDispatch(callback);

  bridge = { connect: () => this.Core };

  public constructor(params?: { modules?: IModule[] }) {
    this.Core = new CoreStore<S>(params);
  }
}
