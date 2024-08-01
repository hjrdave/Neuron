import { useEffect, useState } from "react";
import type { Store as CoreStore } from "../vanilla";

export type UseWeakNeuron<T, A = { [key: string]: unknown }> = (
  selector: string
) => [T, (value: T | ((prevState: T) => T)) => void, A];

export const useWeakNeuron = <T, A>(
  selectorKey: string,
  Store: CoreStore<{ [key: string]: unknown }, A>
) => {
  const stateActions = Store.getActions(selectorKey as keyof A);
  const [state, _setState] = useState(Store.getRef(selectorKey));
  const [actions] = useState(stateActions);
  const setState = (value: T | ((prevState: T) => T)) =>
    Store.set(selectorKey, value);

  useEffect(() => {
    _setState(Store.getRef(selectorKey));
  }, [Store, selectorKey]);

  useEffect(() => {
    Store?.onDispatch((payload) => {
      if (payload.key === selectorKey) {
        const newState = payload.state;
        _setState(newState as unknown as T);
      }
    });
  }, [Store, selectorKey]);
  return [state, setState, actions] as [T, typeof setState, A];
};
