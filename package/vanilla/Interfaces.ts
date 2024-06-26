import type { IPayload as Payload } from "./Payload";
import type { IModule as Module } from "./Module";

export enum InterceptorTypes {
  OnLoad = "onLoad",
  OnRun = "onRun",
  onCallback = "onCallback",
}

export type Props = { [key: string]: unknown };

export type SelectorKey<S> = keyof S;

export type Actions<A, S, D> = (
  dispatch: (mutator: DispatchMutator<S, D>) => void
) => A;

export type DispatchMutator<S, A> = <SelectorKey extends keyof S>(
  payload: Payload<S, A, SelectorKey>
) => void;

export type DispatchCallback<S, A> = DispatchMutator<S, A>;

export type DispatchPayload<S, D = undefined> = <SelectorKey extends keyof S>(
  key: SelectorKey,
  mutator: DispatchMutator<S, D>
) => void;

export type OnDispatch<S, A> = (callback: DispatchCallback<S, A>) => void;

export type AddState<S, A> = <
  SelectorKey extends keyof S,
  ActionKey extends keyof A
>(
  storeItem: StoreItem<
    SelectorKey,
    S[SelectorKey],
    A[ActionKey],
    Features<S, A>
  >
) => void;

export type GetState<S> = <SelectorKey extends keyof S>(
  selector: SelectorKey
) => S[SelectorKey];

export type SetState<S> = <SelectorKey extends keyof S>(
  selector: SelectorKey,
  newState: S[SelectorKey] | ((prevState: S[SelectorKey]) => S[SelectorKey])
) => void;

export type HasState<S> = (key: SelectorKey<S>) => boolean;

export type UseModule<S, A> = (module: Module<S, A>) => void;

export type GetActions<A> = <ActionKey extends keyof A>(
  selector: ActionKey
) => A[ActionKey];

export interface StoreItem<SelectorKey, State, Actions, Features> {
  key: SelectorKey;
  state: State;
  actions?: Actions;
  features?: Features;
}

export interface Features<S, A> {
  onLoad?: DispatchMutator<S, A>;
  onRun?: DispatchMutator<S, A>;
  onCallback?: DispatchMutator<S, A>;
}
