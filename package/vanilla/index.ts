import { Store as StoreInstance } from "./Store";
import type { IStore } from "./Store";
import type { Params as Options } from "./Store";
import type {
  SelectorKey as TSelectorKey,
  Actions as TActions,
  StateType as TStateType,
  StoreProps as TStoreProps,
  DataProps,
  DispatchMutator as TDispatchMutator,
  DispatchPayload as TDispatchPayload,
  DispatchCallback as TDispatchCallback,
  StoreItem as IStoreItem,
  Features as IFeatures,
  ActionProps,
} from "./Interfaces";
import { Module as ModuleInstance } from "./Module";
import type { Params, IModule } from "./Module";
import type { IPayload } from "./Payload";

export type Store<S = { [key: string]: unknown }> = IStore<S>;
export type Module = IModule;
export type SelectorKey<S> = TSelectorKey<S>;
export type Payload<T = unknown, S = { [key: string]: unknown }> = IPayload<
  T,
  S
>;
export type StoreProps = TStoreProps;
export type StoreItem<
  T = unknown,
  S = StoreProps,
  A = ActionProps
> = IStoreItem<T, S, A>;
export type StateType = TStateType;
export type Actions<
  A = { [key: string]: unknown },
  T = unknown,
  S = { [key: string]: unknown }
> = TActions<A, T, S>;
export type DispatchMutator<
  T = StateType,
  S = StoreProps,
  D = DataProps
> = TDispatchMutator<T, S, D>;
export type DispatchPayload<S = StoreProps> = TDispatchPayload<S>;
export type DispatchCallback<S = StoreProps> = TDispatchCallback<S>;
export type Features<T = unknown, S = StoreProps> = IFeatures<T, S>;
/**
 * Creates a Neuron store instance. Stores are globally accessible.
 * @param {Options} options - Store options
 */
export function createStore<S = { [key: string]: unknown }>(options?: Options) {
  return new StoreInstance<S>(options);
}

/**
 * Creates a Neuron module. These can be passed to Store.use to extend store instance.
 * @param {Params} params - imported module object
 */
export function createModule(params: Params) {
  return new ModuleInstance(params);
}
