import { useContext } from "react";
import { Features } from "../interfaces";
import { IContext, StoreInstance } from "./PrivateNeuronClient";
import { useSubscriber } from "../useSubscriber";
export default function privateNeuron<T, A>(
  Context: React.Context<IContext>,
  features?: Features<T, A>
) {
  const { actions, key, ...otherFeatures } = features ?? ({} as Features<T, A>);
  const stateKey = key ? key : Math.floor(Math.random() * 899999999 + 100000);

  const useInitState = (
    state: T,
    store: StoreInstance /**This needs to be passed from usePrivateNeuron hook to work */
  ) =>
    store.add({
      key: stateKey,
      state: state,
      actions: actions as any,
      features: otherFeatures as any,
    });

  const useState = <S>(sliceSelector?: (state: T) => S) => {
    const { store } = useContext(Context);
    const [state, actions] = useSubscriber<T, A, S>(
      store,
      stateKey,
      sliceSelector
    );
    return [state, actions] as [typeof state, typeof actions];
  };
  return [useInitState, useState] as [typeof useInitState, typeof useState];
}
