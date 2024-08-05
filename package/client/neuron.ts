import { ClientStore, Features } from "./NeuronClient";
import { useSubscriber } from "./useSubscriber";

export const neuron = <T, A>(
  store: ClientStore,
  initialState: T,
  features?: Features<T, A>
) => {
  const privateKey =
    Math.floor(Math.random() * (10 ** 11 - 10 ** 11)) + 10 ** 11;
  store.add({
    key: privateKey,
    state: initialState,
    actions: features?.actions as any, // Correctly infer the action types
    features: features as any,
  });
  return () => useSubscriber<T, A>(store as any, privateKey);
};
