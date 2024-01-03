import Neuron from "../../vanilla";

export enum StorageTypes {
  SESSION = "session",
  LOCAL = "local",
}

export interface ModuleProps {
  persist?: StorageTypes.LOCAL | StorageTypes.SESSION | boolean;
}

const moduleName = `@sandstack/neuron/persist`; //need a unique id that is passed by store

const saveStateToStorage = (payload: Neuron.Payload<string, any>) => {
  const isEnabled = (payload?.features as any)?.persist;
  if (isEnabled) {
    const storageKey = `${moduleName}/${payload.key as string}`;
    const storageType =
      (payload?.features as any)?.persist === StorageTypes.SESSION
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

const getStateFromStorage = (payload: Neuron.Payload<string, any>) => {
  const isEnabled = (payload?.features as any)?.persist;
  if (isEnabled) {
    const storageKey = `${moduleName}/${payload.key as string}`;
    const storageType =
      (payload?.features as any)?.persist === StorageTypes.SESSION
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

const Persist = Neuron.Module({
  name: moduleName,
  onLoad: (payload) => {
    const cachedState = getStateFromStorage(payload as any);
    if (cachedState !== null && cachedState !== undefined) {
      payload.state = cachedState;
    }
  },
  onCallback: (payload) => {
    saveStateToStorage(payload as any);
  },
});
export default Persist;
