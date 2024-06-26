import { Store as StoreInstance } from "./Store";
import type { IStore } from "./Store";
import type { Params as Options } from "./Store";
import type {
  SelectorKey as TSelectorKey,
  Actions as TActions,
  DispatchMutator as TDispatchMutator,
  DispatchPayload as TDispatchPayload,
  DispatchCallback as TDispatchCallback,
  StoreItem as IStoreItem,
  Features as IFeatures,
} from "./Interfaces";
import { Module as ModuleInstance } from "./Module";
import type { Params, IModule } from "./Module";
import type { IPayload } from "./Payload";

export type Store<S, A> = IStore<S, A>;
export type Module<S, A> = IModule<S, A>;
export type SelectorKey<S> = TSelectorKey<S>;
export type Payload<S, A, SelectorKey extends keyof S> = IPayload<
  S,
  A,
  SelectorKey
>;
export type StoreItem<SelectorKey, S, A, F> = IStoreItem<SelectorKey, S, A, F>;
export type Actions<A, S, D> = TActions<A, S, D>;
export type DispatchMutator<S, A> = TDispatchMutator<S, A>;
export type DispatchPayload<S> = TDispatchPayload<S>;
export type DispatchCallback<S, A> = TDispatchCallback<S, A>;
export type Features<S, A> = IFeatures<S, A>;
/**
 * Creates a Neuron store instance. Stores are globally accessible.
 * @param {Options} options - Store options
 */
export function createStore<S, A>(options?: Options<S, A>) {
  return new StoreInstance<S, A>(options);
}

/**
 * Creates a Neuron module. These can be passed to Store.use to extend store instance.
 * @param {Params} params - imported module object
 */
export function createModule(params: Params<unknown, unknown>) {
  return new ModuleInstance(params);
}
