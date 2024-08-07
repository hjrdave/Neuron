import { ClientStore, Features } from "./NeuronClient";
import { useSubscriber } from "./useSubscriber";

export const neuron = <T, A>(
  store: ClientStore,
  initialState: T,
  features?: Features<T, A>
) => {
  const { actions, key: _key, ..._features } = features as Features<T, A>;
  const key =
    _key ?? Math.floor(Math.random() * (10 ** 11 - 10 ** 11)) + 10 ** 11;
  store.add({
    key: key,
    state: initialState,
    actions: actions as any, // Correctly infer the action types
    features: _features as any,
  });
  return <S>(sliceSelector?: (state: T) => S) =>
    useSubscriber<T, A, S>(store as any, key, sliceSelector);
};
