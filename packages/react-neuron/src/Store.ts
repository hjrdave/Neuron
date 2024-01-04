import {
  Store as CoreStore,
  SelectorKey,
  Module as IModule,
  DispatchCallback,
} from "../../vanilla-neuron/vanilla-neuron/src";
import { Selector } from "../neuron-vanilla/modules/slices";
import State, { StateProps } from "./State";
import Module, { ModuleProps } from "./Module";
import useNeuron from "./useNeuron";
import useWeakNeuron from "./useWeakNeuron";
import useDispatch from "./useDispatch";
import {
  StateType,
  StoreItem,
} from "../../vanilla-neuron/vanilla-neuron/src/vanilla.interfaces";

export default class Store<S = { [key: string]: unknown }, M = unknown> {
  private Core: CoreStore<S>;

  Module = (props: ModuleProps) =>
    Module({ ...props, ...{ Store: this.Core } });

  State = <T = unknown, A = { [key: string]: unknown }>(
    props: StateProps<T, A, S> & M
  ) => State<T, A, S, M>({ ...props, ...{ Store: this.Core } } as any);

  useNeuron = <T = unknown, A = { [key: string]: unknown }>(
    selector: SelectorKey<S> | Selector<S, T>
  ) => useNeuron<T, A, S>(selector as any, this.Core);

  useWeakNeuron = <T = unknown, A = { [key: string]: unknown }>(
    selector: string
  ) => useWeakNeuron<T, A, S>(selector as SelectorKey<unknown>, this.Core);

  useDispatch = <T = unknown, D = { [key: string]: any }>(
    selector: SelectorKey<S>
  ) => useDispatch<T, S, D>(selector, this.Core);

  setState = <T = unknown>(key: SelectorKey<S>, state: T) =>
    this.Core.set(key, state);

  getState = <T = unknown>(key: SelectorKey<S>) => this.Core.get<T>(key);

  addState = <T = unknown>(storeItem: StoreItem) =>
    this.Core.add<T>(storeItem as StoreItem<any, any, any>);

  onDispatch = (callback: DispatchCallback<unknown>) =>
    this.Core.onDispatch(callback as any);

  bridge = { connect: () => this.Core };

  public constructor(params?: { modules?: IModule<StateType, S>[] }) {
    this.Core = CoreStore<S>(params);
  }
}
