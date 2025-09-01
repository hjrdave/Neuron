import { NeuronKey } from "../core";

/**
 * Configuration options for a Neuron query or mutation.
 * @template T The type of data managed by the query or mutation.
 */
export interface Options<T> {
  /** A unique key for caching, defaults to an auto-generated key. */
  key?: NeuronKey;
  /** The default value to return if no data is available. */
  fallback: T;
  /** Time in milliseconds before cached data is considered stale. */
  staleTime?: number;
}

/**
 * Defines synchronous and asynchronous operations for a Neuron data source.
 * @template T The type of data managed by the Neuron.
 */
export interface INeuronSync<T> {
  /** Creates a query action for fetching data. */
  query: QueryAsyncAction<T>;
  /** Creates a mutation action for updating data. */
  mutation: MutationAsyncAction<T>;
}

/**
 * A factory for creating query actions to fetch data synchronously or asynchronously.
 * @template T The type of data returned by the query.
 * @returns A query action object with synchronous and asynchronous methods.
 */
export type QueryAsyncAction<T> = <P>(
  /** The function that fetches data, optionally accepting parameters. */
  fn: (params?: P) => Promise<T>
) => {
  /** Synchronously watches or triggers the query. */
  query: TQuery<T, P>;
  /** Asynchronously fetches the query data. */
  queryAsync: TQueryAsync<T, P>;
};

/**
 * A factory for creating mutation actions to update data.
 * @template T The type of data returned by the mutation.
 * @returns A mutation action object for triggering updates.
 */
export type MutationAsyncAction<T> = <R>(
  /** The function that performs the mutation, accepting a request payload. */
  fn: (request: R) => Promise<T>
) => {
  /** Triggers or watches the mutation. */
  mutation: TMutation<T, R>;
};

/**
 * A synchronous query operation for watching or triggering data fetches.
 * @template T The type of data returned by the query.
 * @template P The type of parameters for the query function.
 */
type TQuery<T, P> = (
  /** Array of strings or numbers to form a unique cache key. */
  cacheKey: (string | number)[],
  /** Optional parameters for the query function. */
  params?: P
) => {
  /** Subscribes to query state changes with a callback. */
  watch: (callBack: (syncState: SyncState<T>) => void) => void;
  /** Manually triggers the query to sync data. */
  sync: () => void;
};

/**
 * An asynchronous query operation for fetching data.
 * @template T The type of data returned by the query.
 * @template P The type of parameters for the query function.
 * @returns A promise resolving to the query data.
 */
type TQueryAsync<T, P> = (params?: P) => Promise<T>;

/**
 * A mutation operation for updating data and watching state changes.
 * @template T The type of data returned by the mutation.
 * @template R The type of the request payload for the mutation.
 */
type TMutation<T, R> = () => {
  /** Subscribes to mutation state changes with a callback. */
  watch: (callBack: (syncState: SyncState<T>) => void) => void;
  /** Triggers the mutation with the provided request payload. */
  mutate: (request: R) => void;
};

/**
 * Represents the state of a query or mutation.
 * @template T The type of data in the state.
 */
export interface SyncState<T> {
  /** Indicates if the query or mutation is currently loading. */
  loading: boolean;
  /** The error, if any, from the query or mutation. */
  error: Error | null;
  /** The data returned by the query or mutation. */
  data: T;
}

/**
 * Actions to update the state of a query or mutation.
 * @template T The type of data in the state.
 */
export interface Actions<T> {
  /** Sets the loading state. */
  setLoading: (isLoading: boolean) => void;
  /** Sets the error state. */
  setError: (error: Error | null) => void;
  /** Sets the data state. */
  setData: (data: T) => void;
}

/**
 * Represents cached data with metadata.
 * @template T The type of cached data.
 */
export interface CachedData<T> {
  /** The unique key for the cached data. */
  cacheKey: string;
  /** The timestamp when the data was cached. */
  timeStamp: Date;
  /** The cached data. */
  data: T;
}
