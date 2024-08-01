import type { Store } from "../vanilla";
import type { DispatchPayload, DispatchMutator } from "../vanilla/Interfaces";

export type UseDispatch<S, A> = DispatchPayload<S, A>;

export const useDispatch =
  <S, A, SelectorKey extends keyof S>(
    selector: SelectorKey,
    Store: Store<S, A>
  ) =>
  (mutator: DispatchMutator<S, A, SelectorKey>) =>
    Store.dispatch(selector, mutator as DispatchMutator<S, A, keyof S>);
