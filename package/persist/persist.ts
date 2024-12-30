import { Module, IPayload, NeuronKey, IModule } from "../core";

const moduleName = `@sandstack/neuron-persist`;

const saveStateToStorage = <T>(
  payload: IPayload<T>,
  storageKey?: string,
  storageType?: "session" | "local"
) => {
  const _storageKey = `${moduleName}/${storageKey ?? payload.key}`;
  const _storageType = storageType === "session" ? "session" : "local";

  const stateToCache = JSON.stringify(payload.state);
  if (_storageType === "local") {
    if (localStorage) {
      localStorage.setItem(_storageKey, stateToCache);
    }
  } else if (_storageType === "session") {
    if (sessionStorage) {
      sessionStorage.setItem(_storageKey, stateToCache);
    }
  }
};

const getStateFromStorage = <T>(
  payload: IPayload<T>,
  storageKey?: string,
  storageType?: "session" | "local"
) => {
  const _storageKey = `${moduleName}/${storageKey ?? payload.key}`;
  const _storageType = storageType === "session" ? "session" : "local";
  if (_storageType === "local") {
    if (localStorage) {
      const cachedValue = localStorage?.getItem(_storageKey);
      if (cachedValue !== null) {
        const parsedCachedValue = JSON.parse(cachedValue) as T;
        return parsedCachedValue;
      }
      return null;
    }
  } else if (_storageType === "session") {
    if (sessionStorage) {
      const cachedValue = sessionStorage.getItem(_storageKey);
      if (cachedValue !== null) {
        const parsedCachedValue = JSON.parse(cachedValue) as T;
        return parsedCachedValue;
      }
      return null;
    }
  }
  return null;
};

/**
 * The `Persist` function initializes a persistence module for neuron states.
 * It allows states to be saved to and retrieved from browser storage or a custom storage mechanism.
 *
 * @param options - Configuration options for the `Persist` module.
 * @returns A `Module` instance that handles state persistence.
 */
export const Persist = (options?: PersistOptions): IModule =>
  new Module({
    name: moduleName,
    onInit: (payload: IPayload<unknown>) => {
      if (options?.storage?.getItem) {
        const cachedState = options?.storage?.getItem?.(payload.key);
        if (cachedState != null && cachedState != undefined) {
          payload.state = cachedState;
        } else {
          if (options.storage.setItem) {
            options?.storage?.setItem?.(payload.key, payload.state);
          } else {
            saveStateToStorage(
              payload,
              options?.storageKey,
              options.storageType
            );
          }
        }
      } else {
        const cachedState = getStateFromStorage(
          payload,
          options?.storageKey,
          options?.storageType
        );
        if (cachedState != null && cachedState != undefined) {
          payload.state = cachedState;
        } else {
          saveStateToStorage(
            payload,
            options?.storageKey,
            options?.storageType
          );
        }
      }
    },
    onCallback: (payload: IPayload<unknown>) => {
      options?.storage?.setItem?.(payload.key, payload.state) ??
        saveStateToStorage(payload, options?.storageKey, options?.storageType);
    },
  });

/**
 * Interface defining the options for the `Persist` module.
 * Ensures `storageType` and `storage` cannot be used together.
 */
export type PersistOptions =
  | {
      /** Custom name for the module. */
      name?: string;

      /** storage key to be used Neuron state.
       * This only needs to be used when a Neuron state does not have its own key and the module is instantiated on an individual Neuron instance.
       */
      storageKey?: string;
      storage?: never;
      storageType?: never;
    }
  | {
      /** Custom name for the module. */
      name?: string;

      /** storage key to be used Neuron state.
       * This only needs to be used when a Neuron state does not have its own key and the module is instantiated on an individual Neuron instance.
       */
      storageKey?: string;

      /** Browser storage type to use: `localStorage` or `sessionStorage`. Defaults to "local". */
      storageType: "session" | "local";

      /** Custom storage handlers are not allowed when `storageType` is defined. */
      storage?: never;
    }
  | {
      /** Custom name for the module. */
      name?: string;

      /** storage key to be used Neuron state.
       * This only needs to be used when a Neuron state does not have its own key and the module is instantiated on an individual Neuron instance.
       */
      storageKey?: string;

      /** Browser storage type is not allowed when `storage` is defined. */
      storageType?: never;

      /**
       * Custom storage handlers for saving and retrieving state.
       */
      storage: {
        /**
         * A custom function to retrieve an item from storage.
         * @param key - The key of the item to retrieve.
         * @returns The retrieved state or `null` if not found.
         */
        getItem?: (key: NeuronKey) => unknown | null;

        /**
         * A custom function to save an item to storage.
         * @param key - The key of the item to save.
         * @param newState - The new state to save.
         */
        setItem?: (key: NeuronKey, newState: unknown) => void;
      };
    };
