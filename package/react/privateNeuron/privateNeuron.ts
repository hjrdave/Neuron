import { useContext, useEffect } from "react";
import { Features } from "../interfaces";
import { IContext, StoreInstance } from "./PrivateNeuronClient";
import { useSubscriber } from "../useSubscriber";
export default function privateNeuron<T>(
  Context: React.Context<IContext>,
  features?: Features<T, unknown>
) {
  const key = features?.key
    ? features.key
    : Math.floor(Math.random() * 899999999 + 100000);
  const useInitState = (
    state: T,
    store: StoreInstance /**This needs to be passed from usePrivateNeuron hook to work */
  ) => store.add({ key: key, state: state, features: features as any });
  const useState = <S>(sliceSelector?: (state: T) => S) => {
    const { store } = useContext(Context);
    const [state, actions] = useSubscriber<T, unknown, S>(
      store,
      key,
      sliceSelector
    );
    return [state, actions] as [typeof state, typeof actions];
  };
  return [useInitState, useState] as [typeof useInitState, typeof useState];
}
