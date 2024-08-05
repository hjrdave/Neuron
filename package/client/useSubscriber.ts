import { useState } from "react";
import { ClientStore } from "./NeuronClient";

export const useSubscriber = <T, A>(
  store: ClientStore,
  selector: number | string
) => {
  const initialState = store.getRef(selector) as T;
  const [state, _setState] = useState<T>(initialState);
  const set = (state: T | ((prev: T) => T)) => store.set(selector, state);
  const _actions = (store.getActions(selector as never) ?? {}) as A;
  const actions = {
    ..._actions,
    set,
  };
  store.onDispatch((payload) => {
    if (payload.key === selector) {
      _setState(payload.state as T);
    }
  });
  return [state, actions] as [T, typeof actions];
};
