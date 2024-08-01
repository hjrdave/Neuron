import type { IPayload as Payload } from "./Payload";
import type { IModule as Module } from "./Module";

export enum InterceptorTypes {
  OnLoad = "onLoad",
  OnRun = "onRun",
  onCallback = "onCallback",
}

export type Props = { [key: string]: unknown };

export type SelectorKey<S> = keyof S;

export type Actions<A, S, SelectorKey extends keyof S> = (
  dispatch: (mutator: DispatchMutator<S, A, SelectorKey>) => void
) => A;

export type DispatchMutator<S, A, SelectorKey extends keyof S> = (
  payload: Payload<S, A, SelectorKey>
) => void;

export type DispatchCallback<
  S,
  A,
  SelectorKey extends keyof S
> = DispatchMutator<S, A, SelectorKey>;

export type DispatchPayload<S, A> = <SelectorKey extends keyof S>(
  key: SelectorKey,
  mutator: DispatchMutator<S, A, SelectorKey>
) => void;

export type OnDispatch<S, A> = (
  callback: DispatchCallback<S, A, SelectorKey<S>>
) => void;

export type AddState<S, A, F> = <
  SelectorKey extends keyof S,
  ActionKey extends keyof A
>(
  storeItem: StoreItem<S, A, F, SelectorKey, ActionKey>
) => void;

export type GetStore<S, A> = <
  SelectorKey extends keyof S,
  ActionKey extends keyof A
>() => StoreItem<S, A, Features<S, A, SelectorKey>, SelectorKey, ActionKey>[];

export type GetState<S> = <SelectorKey extends keyof S>(
  selector: SelectorKey
) => S[SelectorKey];

export type SetState<S> = <SelectorKey extends keyof S>(
  selector: SelectorKey,
  newState: S[SelectorKey] | ((prevState: S[SelectorKey]) => S[SelectorKey])
) => void;

export type HasState<S> = (key: SelectorKey<S>) => boolean;

export type UseModule = (module: Module) => void;

export type GetActions<A> = <ActionKey extends keyof A>(
  selector: ActionKey
) => A[ActionKey];

export interface StoreItem<
  S,
  A,
  F,
  SelectorKey extends keyof S,
  ActionKey extends keyof A
> {
  key: SelectorKey;
  state: S[SelectorKey];
  actions?: (
    dispatch: (mutator: (payload: Payload<S, A, SelectorKey>) => void) => void
  ) => A[ActionKey];
  features?: F;
}

export interface Features<S, A, SelectorKey extends keyof S> {
  onLoad?: DispatchMutator<S, A, SelectorKey>;
  onRun?: DispatchMutator<S, A, SelectorKey>;
  onCallback?: DispatchMutator<S, A, SelectorKey>;
}
