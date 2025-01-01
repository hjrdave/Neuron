import { useEffect, useState } from "react";
import { ClientMethods, NeuronKey } from "../core";
export const useNeuron: DynamicNeuronHook = <T = unknown>(
  key: NeuronKey,
  client: ClientMethods
) => {
  const [state, _setState] = useState<T>(client.getRef(key));
  const setState = (newState: T | ((prev: T) => T)) => {
    client.dispatch(key, (payload) => {
      payload.state =
        typeof newState === "function"
          ? (newState as any)?.(payload.prevState)
          : newState;
    });
  };
  useEffect(() => {
    _setState(client.getRef(key));
  }, [key]);
  useEffect(() => {
    client.listen((payload) => {
      if (payload.key === key) {
        _setState(payload.state as T);
      }
    });
  }, [key]);
  return [state, setState] as [T, typeof setState];
};
export type DynamicNeuronHook = <T = unknown>(
  key: NeuronKey,
  client: ClientMethods
) => [T, (newState: T | ((prev: T) => T)) => void];
