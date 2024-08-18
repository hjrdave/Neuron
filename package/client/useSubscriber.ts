import { useEffect, useState } from "react";
import { ClientStore } from "./interfaces";

type SetState<T> = (state: T | ((prev: T) => T)) => void;
type StateOrSlice<S, T> = unknown extends S ? (S extends unknown ? T : S) : S;
type Actions<S, T, A> = unknown extends S
  ? S extends unknown
    ? { set: SetState<T> } & A
    : { set: SetState<T>; setSlice: SetState<S> } & A
  : { set: SetState<T>; setSlice: SetState<S> } & A;

export const useSubscriber = <T, A, S>(
  store: ClientStore,
  selector: number | string,
  sliceSelector?: (state: T) => S
) => {
  const [state, _setState] = useState(
    sliceSelector
      ? sliceSelector(store.getRef(selector) as T)
      : (store.getRef(selector) as T)
  );

  const setSlice: SetState<S> = (state: S | ((prevSlice: S) => S)) => {
    if (sliceSelector) {
      const funcToSelectorString = sliceSelector
        ?.toString()
        .match(/\(\w+\) =>\s*(\S+)/)?.[1];
      const selectorArray =
        typeof funcToSelectorString === "string"
          ? funcToSelectorString?.split(".").slice(1)
          : [] ?? [];
      const prevState = store.getRef(selector) as T;
      const prevSliceState = selectorArray.reduce(
        (acc, key) => acc[key],
        prevState
      ) as unknown as S;
      let sliceState: S;

      if (typeof state === "function") {
        sliceState = (state as (prevSlice: S) => S)?.(prevSliceState);
      } else {
        sliceState = state;
      }

      const deepStateUpdateObject = (
        obj: T,
        path: string[],
        value: unknown
      ): T => {
        const lastKey = path.pop() as keyof any;
        const lastObj = path.reduce((o, key) => (o[key] = o[key] || {}), obj);
        lastObj[lastKey] = value;
        return obj;
      };

      const updatedState = deepStateUpdateObject(
        prevState,
        selectorArray,
        sliceState
      );
      store.set(selector, { ...updatedState });
    }
  };
  const set: SetState<T> = (state: T | ((prev: T) => T)) =>
    store.set(selector, state);
  const _actions = (store.getActions(selector as never) ?? {}) as A;
  const actions = sliceSelector
    ? {
        ..._actions,
        set,
        setSlice,
      }
    : { ..._actions, set };
  useEffect(() => {
    store.onDispatch((payload) => {
      if (payload.key === selector) {
        const state = payload.state as T;
        if (sliceSelector) {
          console.log(payload);
          const sliceState = sliceSelector(state);
          _setState(sliceState);
        } else {
          _setState(state);
        }
      }
    });
  }, []);

  return [state, actions] as [StateOrSlice<S, T>, Actions<S, T, A>];
};
