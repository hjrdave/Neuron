import { useEffect, useState } from "react";
import { INeuron } from "../core";

export function useSubscriber<T, A, S>(
  neuron: INeuron<T, A>,
  slice?: (state: T) => S
) {
  const [state, setState] = useState(
    slice ? slice(neuron.getRef()) : neuron.getRef()
  );
  const set: SetState<T> = (state: T | ((prev: T) => T)) => neuron.set(state);
  const setSlice: SetState<S> = (state: S | ((prevSlice: S) => S)) => {
    if (slice) {
      const funcToSelectorString = slice
        ?.toString()
        .match(/\(\w+\) =>\s*(\S+)/)?.[1];
      const selectorArray =
        typeof funcToSelectorString === "string"
          ? funcToSelectorString?.split(".").slice(1)
          : [];
      const prevState = neuron.getRef();
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

      neuron.set({ ...updatedState });
    }
  };
  const actions = slice
    ? {
        ...neuron.getActions(),
        set,
        setSlice,
      }
    : { ...neuron.getActions(), set };
  useEffect(() => {
    neuron.effect((payload) => {
      if (slice) {
        setState(slice(payload.state));
      } else {
        setState(payload.state);
      }
    });
  }, []);
  return [state, actions] as [StateOrSlice<S, T>, Actions<T, S, A>];
}

export type StateOrSlice<T, S> = unknown extends T
  ? T extends unknown
    ? S
    : T
  : T;
export type Actions<T, S, A> = unknown extends S
  ? T extends unknown
    ? { set: SetState<T> } & A
    : { set: SetState<T>; setSlice: SetState<S> } & A
  : { set: SetState<T>; setSlice: SetState<S> } & A;
export type SetState<T> = (state: T | ((prev: T) => T)) => void;
