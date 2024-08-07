import { useState } from "react";
import { ClientStore } from "./NeuronClient";

type SetState<T> = (state: T | ((prev: T) => T)) => void;
type StateOrSlice<S, T> = unknown extends S ? (S extends unknown ? T : S) : S;
type SetStateOrSlice<S, T, A> = unknown extends S
  ? S extends unknown
    ? ActionsWithJustSet<T> & A
    : ActionsWithSetSlice<S, T> & A
  : ActionsWithSetSlice<S, T> & A;

type ActionsWithJustSet<T> = { set: SetState<T> };
type ActionsWithSetSlice<S, T> = { set: SetState<T>; setSlice: SetState<S> };

export const useSubscriber = <T, A, S>(
  store: ClientStore,
  selector: number | string,
  sliceSelector?: (state: T) => S
) => {
  const initialState = store.getRef(selector) as T;
  const [state, _setState] = useState(
    sliceSelector ? sliceSelector(initialState) : initialState
  );
  const setSlice: SetSlice<S> = (state: S | ((prevSlice: S) => S)) => {
    if (sliceSelector) {
      console.log(state);
    }
  };
  const set: SetState<T> = (state: T | ((prev: T) => T)) =>
    store.set(selector, state);
  const _actions = (store.getActions(selector as never) ?? {}) as A;
  const actions = (
    sliceSelector
      ? {
          ..._actions,
          set,
          setSlice,
        }
      : { ..._actions, set }
  ) as SetStateOrSlice<S, T, A>;
  store.onDispatch((payload) => {
    if (payload.key === selector) {
      if (sliceSelector) {
        _setState(sliceSelector(payload.state as T) as S);
      } else {
        _setState(payload.state as T);
      }
    }
  });

  return [state, actions] as [StateOrSlice<S, T>, typeof actions];
};
