import { NeuronKey } from "../core";

export interface Options<T> {
  key?: NeuronKey;
  fallback: T;
}

export interface INeuronSync<T> {
  query: QueryAsyncAction<T>;
  mutation: MutationAsyncAction<T>;
}

export type QueryAsyncAction<T> = <P>(fn: (params?: P) => Promise<T>) => {
  query: TQuery<T, P>;
};
export type MutationAsyncAction<T> = <R>(fn: (request: R) => Promise<T>) => {
  mutation: TMutation<T, R>;
};

type TQuery<T, P> = (params?: P) => {
  watch: (callBack: (syncState: SyncState<T>) => void) => void;
  sync: () => void;
};

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
