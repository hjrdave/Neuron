import { ClientStore, Features } from "./interfaces";
import { useSubscriber } from "./useSubscriber";

export const neuron = <T, A>(
  store: ClientStore,
  initialState: T,
  features?: Features<T, A>
) => {
  const { actions, key, ..._features } = features ?? {};
  const _key = key ?? Math.floor(Math.random() * 899999999 + 100000);
  store.add({
    key: _key,
    state: initialState,
    actions: actions as any,
    features: _features as any,
  });
  return <S>(sliceSelector?: (state: T) => S) =>
    useSubscriber<T, A, S>(store as any, _key, sliceSelector);
};
