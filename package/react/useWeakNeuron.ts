import React from "react";
import type { Store as CoreStore, SelectorKey } from "../vanilla";

export type UseNeuron<S = { [key: string]: unknown }> = <T, A>(
  selector: SelectorKey<S>
) => [T, (value: T | ((prevState: T) => T)) => void, A];

const useWeakNeuron = <
  T = unknown,
  A = { [key: string]: unknown },
  S = { [key: string]: unknown }
>(
  selectorKey: SelectorKey<S>,
  Store: CoreStore<S>
) => {
  const stateActions = Store.getActions<A>(selectorKey);
  const [state, _setState] = React.useState<T>(Store.get<T>(selectorKey));
  const [actions] = React.useState<A>(stateActions);
  const setState = (value: T | ((prevState: T) => T)) =>
    Store.set<T>(selectorKey, value);

  React.useEffect(() => {
    _setState(Store.get<T>(selectorKey));
  }, [Store, selectorKey]);

  React.useEffect(() => {
    Store?.onDispatch((payload) => {
      if (payload.key === selectorKey) {
        const newState = payload.state as T;
        _setState(newState);
      }
    });
  }, [Store, selectorKey]);
  return [state, setState, actions] as [T, typeof setState, A];
};
export default useWeakNeuron;
