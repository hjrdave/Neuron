import React from "react";
import type { Store as CoreStore } from "../vanilla";
import {
  getSlice,
  setSlice,
  updateStateWithSlice,
  convertSelector,
} from "../slices";
import { Selector } from "../slices";
import type { StateProps } from "./State";
import { ActionProps, SelectorKey } from "../vanilla/Interfaces";

export type UseNeuron<S = StateProps> = <T = unknown, A = ActionProps>(
  selector: SelectorKey<S> | Selector<S, T>
) => [T, (value: T | ((prevState: T) => T)) => void, A];

export const useNeuron = <T = unknown, A = ActionProps, S = StateProps>(
  selector: SelectorKey<S> | Selector<S, T>,
  Store: CoreStore<S>
) => {
  const { key: selectorKey, isSlice: selectorIsSlice } =
      convertSelector<S>(selector),
    stateActions = Store.getActions<A>(selectorKey),
    [state, _setState] = React.useState<T>(
      selectorIsSlice
        ? getSlice<T, S>(selector as Selector<S, T>, Store)
        : Store.get<T>(selectorKey)
    ),
    [actions] = React.useState<A>(stateActions),
    setState = (value: T | ((prevState: T) => T)) =>
      selectorIsSlice
        ? setSlice<T, S>(
            selector as Selector<S, T>,
            value as T /**This needs to account for functions */,
            Store
          )
        : Store.set<T>(selectorKey, value);

  Store?.onDispatch((payload) => {
    if (payload.key === selectorKey) {
      if (selectorIsSlice) {
        const newSliceState = updateStateWithSlice<S>(
          selector as Selector<S, T>,
          payload.state as S
        );
        _setState(newSliceState as React.SetStateAction<T>);
      } else {
        const newState = payload.state as T;
        _setState(newState);
      }
    }
  });

  return [state, setState, actions] as [T, typeof setState, A];
};
