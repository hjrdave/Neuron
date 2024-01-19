import { createModule } from "../vanilla";
import type { Payload as TPayload } from "../vanilla";
export type Payload = TPayload<string, unknown>;
export enum StorageTypes {
  SESSION = "session",
  LOCAL = "local",
}

export interface PersistProps {
  persist?: StorageTypes.LOCAL | StorageTypes.SESSION | boolean;
}

const moduleName = `@sandstack/neuron-persist`; //need a unique id that is passed by store

const saveStateToStorage = (payload: Payload) => {
  const features = payload.features as PersistProps;
  const isEnabled = features?.persist;
  if (isEnabled) {
    const storageKey = `${moduleName}/${payload.key}`;
    const storageType =
      features?.persist === StorageTypes.SESSION
        ? StorageTypes.SESSION
        : StorageTypes.LOCAL;
    const stateToCache = JSON.stringify(payload.state);
    if (storageType === StorageTypes.LOCAL) {
      if (localStorage) {
        localStorage.setItem(storageKey, stateToCache);
      }
    } else if (storageType === StorageTypes.SESSION) {
      if (sessionStorage) {
        sessionStorage.setItem(storageKey, stateToCache);
      }
    }
  }
};

const getStateFromStorage = (payload: Payload) => {
  const features = payload.features as PersistProps;
  const isEnabled = features?.persist;
  if (isEnabled) {
    const storageKey = `${moduleName}/${payload.key as string}`;
    const storageType =
      features?.persist === StorageTypes.SESSION
        ? StorageTypes.SESSION
        : StorageTypes.LOCAL;
    if (storageType === StorageTypes.LOCAL) {
      if (localStorage) {
        const cachedValue = localStorage.getItem(storageKey);
        if (cachedValue !== null) {
          const parsedCachedValue = JSON.parse(cachedValue);
          return parsedCachedValue;
        }
        return cachedValue;
      }
    } else if (storageType === StorageTypes.SESSION) {
      if (sessionStorage) {
        const cachedValue = sessionStorage.getItem(storageKey);
        if (cachedValue !== null) {
          const parsedCachedValue = JSON.parse(cachedValue);
          return parsedCachedValue;
        }
        return cachedValue;
      }
    }
  }
};

const Persist = createModule({
  name: moduleName,
  onLoad: (payload) => {
    const cachedState = getStateFromStorage(payload as Payload);
    if (cachedState !== null && cachedState !== undefined) {
      payload = cachedState;
    }
  },
  onCallback: (payload) => {
    saveStateToStorage(payload as Payload);
  },
});
export default Persist;
