import React from "react";
import type {
  Store as CoreStore,
  SelectorKey as TSelectorKey,
} from "../vanilla";
import {
  getSlice,
  setSlice,
  updateStateWithSlice,
  convertSelector,
} from "../slices";
import { Selector } from "../slices";

export type UseNeuron<S, A> = <
  SelectorKey extends keyof S,
  ActionKey extends keyof A
>(
  selector: SelectorKey | Selector<unknown, S>
) => [
  S[SelectorKey],
  (
    value: S[SelectorKey] | ((prevState: S[SelectorKey]) => S[SelectorKey])
  ) => void,
  A[ActionKey]
];

export const useNeuron = <
  S,
  A,
  SelectorKey extends keyof S,
  ActionKey extends keyof A,
  T
>(
  selector: TSelectorKey<S> | Selector<T, S>,
  Store: CoreStore<S, A>
) => {
  const { key: selectorKey, isSlice: selectorIsSlice } = convertSelector<
    unknown,
    S
  >(selector);
  const stateActions = Store.getActions(selectorKey as unknown as ActionKey);
  const defaultValue = selectorIsSlice
    ? getSlice(
        selector as Selector<unknown, S>,
        Store as unknown as CoreStore<S, { [key: string]: unknown }>
      )
    : Store.getRef(selectorKey);
  const [state, _setState] = React.useState(defaultValue);
  const [actions] = React.useState(stateActions);
  const setState = (
    value: S[SelectorKey] | ((prevState: S[SelectorKey]) => S[SelectorKey])
  ) => {
    if (selectorIsSlice) {
      setSlice(
        selector as Selector<unknown, S>,
        value /**This needs to account for functions */,
        Store as unknown as CoreStore<S, { [key: string]: unknown }>
      );
    } else {
      Store.set(selectorKey as SelectorKey, value);
    }
  };

  Store?.onDispatch((payload) => {
    if (payload.key === selectorKey) {
      if (selectorIsSlice) {
        const newSliceState = updateStateWithSlice(
          selector as Selector<unknown, S>,
          payload.state
        );
        _setState(newSliceState);
      } else {
        const newState = payload.state;
        _setState(newState);
      }
    }
  });

  return [state, setState, actions] as [
    typeof state,
    typeof setState,
    A[ActionKey]
  ];
};
