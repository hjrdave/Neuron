import type { Store as ICoreStore } from "../vanilla";
import { Store as CoreStore } from "../vanilla/Store";
import type { Module as IModule } from "../vanilla";
import type { Selector } from "../slices";
import { State } from "./State";
import type { StateProps } from "./State";
import { Module } from "./Module";
import type { ModuleProps } from "./Module";
import type { UseNeuron } from "./useNeuron";
import { useNeuron } from "./useNeuron";
import type { UseDispatch } from "./useDispatch";
import type { UseWeakNeuron } from "./useWeakNeuron";
import { useWeakNeuron } from "./useWeakNeuron";
import { useDispatch } from "./useDispatch";
import type {
  ActionProps,
  SelectorKey,
  DispatchCallback,
  StoreItem,
  SetState,
  AddState,
  OnDispatch,
} from "../vanilla/Interfaces";
export interface IStore<S, M> {
  readonly Module: (props: ModuleProps) => null;
  readonly State: <T = unknown, A = ActionProps>(
    props: StateProps<T, A, S> & M
  ) => null;
  readonly useNeuron: UseNeuron<S>;
  readonly useWeakNeuron: UseWeakNeuron;
  readonly useDispatch: UseDispatch<S>;
  readonly setState: SetState<S>;
  readonly addState: AddState<S>;
  readonly onDispatch: OnDispatch<S>;
  readonly bridge: { connect: () => void };
}
export class Store<S = StateProps, M = ModuleProps> implements IStore<S, M> {
  private Core: ICoreStore<S>;

  Module = (props: ModuleProps) =>
    Module({ ...props, ...{ Store: this.Core } });

  State = <T = unknown, A = ActionProps>(props: StateProps<T, A, S> & M) =>
    State<T, A, S, M>({ ...props, ...{ Store: this.Core } });

  useNeuron = <T = unknown, A = ActionProps>(
    selector: SelectorKey<S> | Selector<S, T>
  ) => useNeuron<T, A, S>(selector, this.Core);

  useWeakNeuron = <T = unknown, A = ActionProps>(selector: string) =>
    useWeakNeuron<T, A, S>(selector as SelectorKey<unknown>, this.Core);

  useDispatch = <T = unknown, D = { [key: string]: unknown }>(
    selector: SelectorKey<S>
  ) => useDispatch<T, S, D>(selector, this.Core);

  setState = <T = unknown>(key: SelectorKey<S>, state: T) =>
    this.Core.set(key, state);

  getState = <T = unknown>(key: SelectorKey<S>) => this.Core.get<T>(key);

  getStateRef = <T = unknown>(key: SelectorKey<S>) => this.Core.getRef<T>(key);

  addState = <T = unknown, A = ActionProps>(storeItem: StoreItem<T, S, A>) =>
    this.Core.add<T>(storeItem as StoreItem<T, S>);

  onDispatch = (callback: DispatchCallback<S>) =>
    this.Core.onDispatch(callback);

  bridge = { connect: () => this.Core };

  public constructor(params?: { modules?: IModule[] }) {
    this.Core = new CoreStore<S>(params);
  }
}
