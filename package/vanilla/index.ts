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
export type StoreItem<
  S,
  A,
  F,
  SelectorKey extends keyof S,
  ActionKey extends keyof A
> = IStoreItem<S, A, F, SelectorKey, ActionKey>;
export type Actions<A, S, SelectorKey extends keyof S> = TActions<
  A,
  S,
  SelectorKey
>;
export type DispatchMutator<
  S,
  A,
  SelectorKey extends keyof S
> = TDispatchMutator<S, A, SelectorKey>;
export type DispatchPayload<S, A> = TDispatchPayload<S, A>;
export type DispatchCallback<
  S,
  A,
  SelectorKey extends keyof S
> = TDispatchCallback<S, A, SelectorKey>;
export type Features<S, A, SelectorKey extends keyof S> = IFeatures<
  S,
  A,
  SelectorKey
>;
/**
 * Creates a Neuron store instance. Stores are globally accessible.
 * @param {Options} options - Store options
 */
export function createStore<
  S = { [key: string]: unknown },
  A = { [key: string]: unknown }
>(options?: Options<S, A>) {
  return new StoreInstance<S, A>(options);
}

/**
 * Creates a Neuron module. These can be passed to Store.use to extend store instance.
 * @param {Params} params - imported module object
 */
export function createModule<
  S = { [key: string]: unknown },
  A = { [key: string]: unknown }
>(params: Params<S, A>) {
  return new ModuleInstance(params);
}
