import {
  SelectorKey,
  Store,
  DispatchPayload,
  DispatchMutator,
} from "../vanilla";

export type UseDispatch<S = { [key: string]: unknown }> = DispatchPayload<S>;

const useDispatch =
  <T, S, D>(selector: SelectorKey<S>, Store: Store<S>) =>
  (mutator: DispatchMutator<T, S, D>) =>
    Store.dispatch<T, D>(selector, mutator);

export default useDispatch;
