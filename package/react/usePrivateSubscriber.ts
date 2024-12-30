import { useEffect, useState } from "react";
import { NeuronKey, INeuronClient } from "../core";

export function usePrivateSubscriber<T, A, S>(
  neuronClient: INeuronClient,
  neuronKey: NeuronKey,
  slice?: (state: T) => S
) {
  const [state, setState] = useState(
    slice
      ? slice(neuronClient.getRef(neuronKey))
      : neuronClient.getRef(neuronKey)
  );
  const set: SetState<T> = (state: T | ((prev: T) => T)) =>
    neuronClient.dispatch(neuronKey, (payload) => (payload.state = state));
  const setSlice: SetState<S> = (state: S | ((prevSlice: S) => S)) => {
    if (slice) {
      const funcToSelectorString = slice
        ?.toString()
        .match(/\(\w+\) =>\s*(\S+)/)?.[1];
      const selectorArray =
        typeof funcToSelectorString === "string"
          ? funcToSelectorString?.split(".").slice(1)
          : [];
      const prevState = neuronClient.getRef<T>(neuronKey);
      const prevSliceState = selectorArray.reduce(
        (acc: any, key) => acc[key],
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

      neuronClient.dispatch(
        neuronKey,
        (payload) => (payload.state = { ...updatedState })
      );
    }
  };
  const actions = slice
    ? {
        ...neuronClient.getActions<A>(neuronKey),
        set,
        setSlice,
      }
    : { ...neuronClient.getActions<A>(neuronKey), set };
  useEffect(() => {
    neuronClient.listen((payload) => {
      if (payload.key === neuronKey) {
        if (slice) {
          setState(slice(payload.state as T));
        } else {
          setState(payload.state as S);
        }
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
