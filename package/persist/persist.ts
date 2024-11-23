import { Module } from "../core";
import { IPayload, NeuronKey } from "../core/Interfaces";

export interface PersistFeatures {
  persist?: "session" | "local" | boolean;
}
const moduleName = `@sandstack/neuron-persist`;

const saveStateToStorage = <T>(payload: IPayload<T, PersistFeatures>) => {
  const features = payload.features;
  const isEnabled = features?.persist;
  if (isEnabled) {
    const storageKey = `${moduleName}/${payload.key}`;
    const storageType = features?.persist === "session" ? "session" : "local";
    const stateToCache = JSON.stringify(payload.state);
    if (storageType === "local") {
      if (localStorage) {
        localStorage.setItem(storageKey, stateToCache);
      }
    } else if (storageType === "session") {
      if (sessionStorage) {
        sessionStorage.setItem(storageKey, stateToCache);
      }
    }
  }
};

const getStateFromStorage = <T>(payload: IPayload<T, PersistFeatures>) => {
  const features = payload.features;
  const isEnabled = features?.persist;
  if (isEnabled) {
    const storageKey = `${moduleName}/${payload.key as string}`;
    const storageType = features?.persist === "session" ? "session" : "local";
    if (storageType === "local") {
      if (localStorage) {
        const cachedValue = localStorage.getItem(storageKey);
        if (cachedValue !== null) {
          const parsedCachedValue = JSON.parse(cachedValue);
          return parsedCachedValue as T;
        }
        return cachedValue as T;
      }
    } else if (storageType === "session") {
      if (sessionStorage) {
        const cachedValue = sessionStorage.getItem(storageKey);
        if (cachedValue !== null) {
          const parsedCachedValue = JSON.parse(cachedValue);
          return parsedCachedValue as T;
        }
        return cachedValue as T;
      }
    }
  }
  return payload.state;
};

interface PersistOptions {
  name?: string;
  storage?: {
    getItem?: <T>(
      key: NeuronKey,
      isPersistEnabled?: "session" | "local" | boolean
    ) => T;
    setItem?: <T>(
      key: NeuronKey,
      newState: T,
      isPersistEnabled?: "session" | "local" | boolean
    ) => void;
  };
}

//payload needs to map correctly
export const Persist = (options?: PersistOptions) =>
  new Module({
    name: moduleName,
    onInit: <T>(payload: IPayload<T, PersistFeatures>) => {
      const cachedState: T =
        options?.storage?.getItem?.<T>(
          payload.key,
          payload?.features?.persist
        ) ?? getStateFromStorage(payload);
      payload.state = cachedState;
    },
    onCallback: <T>(payload: IPayload<T, PersistFeatures>) => {
      options?.storage?.setItem?.(
        payload.key,
        payload.state,
        payload.features?.persist
      ) ?? saveStateToStorage(payload);
    },
  });
