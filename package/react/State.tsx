import type { Store } from "../vanilla";
import type { DispatchMutator, Actions } from "../vanilla/Interfaces";
import { IPayload } from "../vanilla/Payload";

export interface StateProps<
  S,
  A,
  SelectorKey extends keyof S,
  ActionKey extends keyof A
> {
  name: SelectorKey;
  state: S[SelectorKey];
  actions?: Actions<A[ActionKey], S, SelectorKey>;
  onLoad?: DispatchMutator<S, A[ActionKey], SelectorKey>;
  onRun?: DispatchMutator<S, A[ActionKey], SelectorKey>;
  onCallback?: DispatchMutator<S, A, SelectorKey>;
}
interface Props<S, A, SelectorKey extends keyof S, ActionKey extends keyof A>
  extends StateProps<S, A, SelectorKey, ActionKey> {
  Store: Store<S, A>;
}

export function State<
  S,
  A,
  SelectorKey extends keyof S,
  ActionKey extends keyof A
>({
  name,
  state,
  onLoad,
  onRun,
  onCallback,
  actions,
  Store,
  ...moduleFeatures
}: Props<S, A, SelectorKey, ActionKey>) {
  Store.add({
    key: name,
    state: state,
    actions: actions as (
      dispatch: (
        mutator: (payload: IPayload<S, A, SelectorKey>) => void
      ) => void
    ) => A[keyof A],
    features: {
      onLoad: onLoad as DispatchMutator<S, A[ActionKey], SelectorKey>,
      onRun: onRun as DispatchMutator<S, A[ActionKey], SelectorKey>,
      onCallback: onCallback as DispatchMutator<S, A[ActionKey], SelectorKey>,
      ...moduleFeatures,
    },
  });
  return null;
}
