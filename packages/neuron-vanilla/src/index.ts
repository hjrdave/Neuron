import IStore, { default as StoreInstance, Params as Options } from "./Store";
import {
  SelectorKey as TSelectorKey,
  Actions as TActions,
  StateType as TStateType,
  StoreProps as TStoreProps,
  DataProps,
  DispatchMutator as TDispatchMutator,
  DispatchPayload as TDispatchPayload,
  DispatchCallback as TDispatchCallback,
  StoreItem as IStoreItem,
} from "./Interfaces";
import { default as ModuleInstance, Params, IModule } from "./Module";
import { IPayload } from "./Payload";
namespace Neuron {
  /**
   * Creates a Neuron store instance. Stores are globally accessible.
   * @param {Options} options - Store options
   */
  export function Store<S = { [key: string]: unknown }>(options?: Options<S>) {
    return new StoreInstance<S>(options);
  }
  /**
   * Creates a Neuron module. These can be passed to Store.use to extend store instance.
   * @param {Params} params - imported module object
   */
  export function Module<T = unknown, S = { [key: string]: unknown }>(
    params: Params<T, S>
  ) {
    return new ModuleInstance<T, S>(params);
  }
  export type Store<S = { [key: string]: unknown }> = IStore<S>;
  export type Module<T = unknown, S = { [key: string]: unknown }> = IModule<
    T,
    S
  >;
  export type SelectorKey<S> = TSelectorKey<S>;
  export type Payload<T = unknown, S = { [key: string]: unknown }> = IPayload<
    T,
    S
  >;
  export type StoreProps = TStoreProps;
  export type StoreItem<
    T = unknown,
    S = StoreProps,
    A = StoreProps
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
}

export type Store<S = { [key: string]: unknown }> = IStore<S>;
export type Module<T = unknown, S = { [key: string]: unknown }> = IModule<T, S>;
export type SelectorKey<S> = TSelectorKey<S>;
export type Payload<T = unknown, S = { [key: string]: unknown }> = IPayload<
  T,
  S
>;
export type StoreProps = TStoreProps;
export type StoreItem<T = unknown, S = StoreProps, A = StoreProps> = IStoreItem<
  T,
  S,
  A
>;
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

/**
 * Creates a Neuron store instance. Stores are globally accessible.
 * @param {Options} options - Store options
 */
export function Store<S = { [key: string]: unknown }>(options?: Options<S>) {
  return new StoreInstance<S>(options);
}

/**
 * Creates a Neuron module. These can be passed to Store.use to extend store instance.
 * @param {Params} params - imported module object
 */
export function Module<T = unknown, S = { [key: string]: unknown }>(
  params: Params<T, S>
) {
  return new ModuleInstance<T, S>(params);
}

export default Neuron;
