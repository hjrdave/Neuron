import { NeuronKey } from "../core";

export interface Options<T> {
  key?: NeuronKey;
  fallback: T;
  staleTime?: number;
}

export interface INeuronSync<T> {
  query: QueryAsyncAction<T>;
  mutation: MutationAsyncAction<T>;
}

export type QueryAsyncAction<T> = <P>(fn: (params?: P) => Promise<T>) => {
  query: TQuery<T, P>;
  queryAsync: TQueryAsync<T, P>;
};
export type MutationAsyncAction<T> = <R>(fn: (request: R) => Promise<T>) => {
  mutation: TMutation<T, R>;
};

type TQuery<T, P> = (
  cacheKey: (string | number)[],
  params?: P
) => {
  watch: (callBack: (syncState: SyncState<T>) => void) => void;
  sync: () => void;
};

type TQueryAsync<T, P> = (params?: P) => Promise<T>;

type TMutation<T, R> = () => {
  watch: (callBack: (syncState: SyncState<T>) => void) => void;
  mutate: (request: R) => void;
};

export interface SyncState<T> {
  loading: boolean;
  error: Error | null;
  data: T;
}

export interface Actions<T> {
  setLoading: (isLoading: boolean) => void;
  setError: (error: Error | null) => void;
  setData: (data: T) => void;
}

export interface SyncCache<T> {
  [cacheKey: string]: SyncCacheItem<T>;
}

export interface SyncCacheItem<T> {
  cacheData: T;
  timeStamp: number;
}
