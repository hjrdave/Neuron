import { Module } from "../core";
import { NeuronKey } from "../core/Neuron";
import { IPayload } from "../core/Payload";

export interface PersistFeatures {
  persist?: "session" | "local" | boolean;
}
const moduleName = `@sandstack/neuron-persist`;

const saveStateToStorage = <T>(payload: IPayload<T, PersistFeatures>) => {
  const isEnabled = payload.features?.persist;
  if (isEnabled) {
    const storageKey = `${moduleName}/${payload.key}`;
    const storageType =
      payload.features?.persist === "session" ? "session" : "local";

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
  const isEnabled = payload.features?.persist;
  if (isEnabled) {
    const storageKey = `${moduleName}/${payload.key}`;
    const storageType =
      payload.features?.persist === "session" ? "session" : "local";
    if (storageType === "local") {
      if (localStorage) {
        const cachedValue = localStorage?.getItem(storageKey);
        if (cachedValue !== null) {
          const parsedCachedValue = JSON.parse(cachedValue) as T;
          return parsedCachedValue;
        }
        return null;
      }
    } else if (storageType === "session") {
      if (sessionStorage) {
        const cachedValue = sessionStorage.getItem(storageKey);
        if (cachedValue !== null) {
          const parsedCachedValue = JSON.parse(cachedValue) as T;
          return parsedCachedValue;
        }
        return null;
      }
    }
  }
  return null;
};

interface PersistOptions {
  name?: string;
  storage?: {
    getItem?: (
      key: NeuronKey,
      isPersistEnabled?: "session" | "local" | boolean
    ) => unknown | null;
    setItem?: (
      key: NeuronKey,
      newState: unknown,
      isPersistEnabled?: "session" | "local" | boolean
    ) => void;
  };
}

//payload needs to map correctly
export const Persist = (options?: PersistOptions) =>
  new Module({
    name: moduleName,
    onInit: (payload: IPayload<unknown, PersistFeatures>) => {
      if (options?.storage?.getItem) {
        const cachedState = options?.storage?.getItem?.(
          payload.key,
          payload?.features?.persist
        );
        if (cachedState != null && cachedState != undefined) {
          payload.state = cachedState;
        } else {
          if (options.storage.setItem) {
            options?.storage?.setItem?.(
              payload.key,
              payload.state,
              payload.features?.persist
            );
          } else {
            saveStateToStorage(payload);
          }
        }
      } else {
        const cachedState = getStateFromStorage(payload);
        if (cachedState != null && cachedState != undefined) {
          payload.state = cachedState;
        } else {
          saveStateToStorage(payload);
        }
      }
    },
    onCallback: (payload: IPayload<unknown, PersistFeatures>) => {
      options?.storage?.setItem?.(
        payload.key,
        payload.state,
        payload.features?.persist
      ) ?? saveStateToStorage(payload);
    },
  });
