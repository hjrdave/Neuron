import type { Store } from "../vanilla";
import type {
  SelectorKey,
  DispatchPayload,
  DispatchMutator,
} from "../vanilla/Interfaces";

export type UseDispatch<S = { [key: string]: unknown }> = DispatchPayload<S>;

export const useDispatch =
  <T, S, D>(selector: SelectorKey<S>, Store: Store<S>) =>
  (mutator: DispatchMutator<T, S, D>) =>
    Store.dispatch<T, D>(selector, mutator);
