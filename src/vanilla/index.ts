import IStore, { default as StoreInstance, Params as Options } from "./Store";
import {
  SelectorKey as TSelectorKey,
  Actions as TActions,
  StateType,
  StoreProps,
  DataProps,
  DispatchMutator as TDispatchMutator,
  DispatchPayload as TDispatchPayload,
} from "./vanilla.interfaces";
import { default as ModuleInstance, Params, IModule } from "./Module";
import { IPayload } from "./Payload";
namespace NeuronGSM {
  /**
   * Creates a NeuronGSM store instance. Stores are globally accessible.
   * @param {Options} options - Store options
   */
  export function Store<S = { [key: string]: unknown }>(options?: Options<S>) {
    return new StoreInstance<S>(options);
  }
  /**
   * Creates a NeuronGSM module. These can be passed to Store.use to extend store instance.
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
}

export type Store<S = { [key: string]: unknown }> = IStore<S>;
export type Module<T = unknown, S = { [key: string]: unknown }> = IModule<T, S>;
export type SelectorKey<S> = TSelectorKey<S>;
export type Payload<T = unknown, S = { [key: string]: unknown }> = IPayload<
  T,
  S
>;
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

/**
 * Creates a NeuronGSM store instance. Stores are globally accessible.
 * @param {Options} options - Store options
 */
export function Store<S = { [key: string]: unknown }>(options?: Options<S>) {
  return new StoreInstance<S>(options);
}

/**
 * Creates a NeuronGSM module. These can be passed to Store.use to extend store instance.
 * @param {Params} params - imported module object
 */
export function Module<T = unknown, S = { [key: string]: unknown }>(
  params: Params<T, S>
) {
  return new ModuleInstance<T, S>(params);
}

export default NeuronGSM;
