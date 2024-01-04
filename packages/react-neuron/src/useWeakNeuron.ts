import React from "react";
import {
  Store as CoreStore,
  SelectorKey,
} from "../../vanilla-neuron/vanilla-neuron/src";

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
  const stateActions = Store.getActions<A, T>(selectorKey);
  const [state, _setState] = React.useState<T>(Store.get<T>(selectorKey));
  const [actions] = React.useState<A>(stateActions);
  const setState = (value: T | ((prevState: T) => T)) =>
    Store.set<T>(selectorKey, value);

  React.useEffect(() => {
    _setState(Store.get<T>(selectorKey));
  }, [selectorKey]);

  React.useEffect(() => {
    Store?.onDispatch((payload) => {
      if (payload.key === selectorKey) {
        const newState = payload.state as T;
        _setState(newState);
      }
    });
  }, [selectorKey]);
  return [state, setState, actions] as [T, typeof setState, A];
};
export default useWeakNeuron;
