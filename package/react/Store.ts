import type { Features, Store as ICoreStore, SelectorKey } from "../vanilla";
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
  DispatchCallback,
  StoreItem,
  SetState,
  AddState,
  OnDispatch,
} from "../vanilla/Interfaces";
// import { UseNeuronNew } from "./useNeuronNew";
export interface IStore<S, A> {
  readonly Module: (props: ModuleProps<S, A>) => null;
  readonly State: <SelectorKey extends keyof S, ActionKey extends keyof A>(
    props: StateProps<S, A, SelectorKey, ActionKey>
  ) => null;
  readonly useNeuron: UseNeuron<S, A>;

  // readonly useNeuronNew: UseNeuronNew<S, A>;
  readonly useWeakNeuron: UseWeakNeuron<unknown>;
  readonly useDispatch: UseDispatch<S, A>;
  readonly setState: SetState<S>;
  readonly addState: AddState<S, A, Features<S, A, keyof S>>;
  readonly onDispatch: OnDispatch<S, A>;
  readonly bridge: { connect: () => void };
}
export class Store<S, A> implements IStore<S, A> {
  private Core: ICoreStore<S, A>;

  Module = (props: ModuleProps<S, A>) =>
    Module({ ...props, ...{ Store: this.Core } });

  State = <SelectorKey extends keyof S, ActionKey extends keyof A>(
    props: StateProps<S, A, SelectorKey, ActionKey>
  ) =>
    State<S, A, SelectorKey, ActionKey>({ ...props, ...{ Store: this.Core } });

  useNeuron = <SelectorKey extends keyof S, ActionKey extends keyof A>(
    selector: SelectorKey | Selector<unknown, S>
  ) => useNeuron<S, A, SelectorKey, ActionKey>(selector, this.Core);

  // useNeuronNew = <SelectorKey extends keyof S>(selector: SelectorKey) =>
  //   useNeuronNew(selector, this.Core);

  useWeakNeuron = <T, A>(selector: string) =>
    useWeakNeuron<T, A>(
      selector,
      this.Core as unknown as ICoreStore<
        {
          [key: string]: unknown;
        },
        A
      >
    );

  useDispatch = <SelectorKey extends keyof S>(selector: SelectorKey) =>
    useDispatch(selector, this.Core);

  setState = (<SelectorKey extends keyof S>(
    key: SelectorKey,
    state: S[SelectorKey]
  ) => this.Core.set(key, state)) as SetState<S>;

  getState = <SelectorKey extends keyof S>(key: SelectorKey) =>
    this.Core.get(key);

  getStateRef = <SelectorKey extends keyof S>(key: SelectorKey) =>
    this.Core.getRef(key);

  addState = (<SelectorKey extends keyof S, ActionKey extends keyof A>(
    storeItem: StoreItem<
      S,
      A,
      Features<S, A, SelectorKey>,
      SelectorKey,
      ActionKey
    >
  ) => this.Core.add(storeItem)) as AddState<S, A, Features<S, A, keyof S>>;

  onDispatch = <SelectorKey extends keyof S>(
    callback: DispatchCallback<S, A, SelectorKey>
  ) => this.Core.onDispatch(callback as DispatchCallback<S, A, keyof S>);

  bridge = { connect: () => this.Core };

  public constructor(params?: { modules?: IModule<S, A>[] }) {
    this.Core = new CoreStore<S, A>(params) as ICoreStore<S, A>;
  }
}
