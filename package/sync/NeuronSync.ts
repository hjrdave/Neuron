import { Neuron, NeuronKey } from "../core";
import {
  Options,
  INeuronSync,
  QueryAsyncAction,
  SyncState,
  Actions,
  MutationAsyncAction,
  SyncCache,
} from "./INeuronSync";

export class NeuronSync<T> implements INeuronSync<T> {
  private readonly fallback: T;
  private readonly key: NeuronKey;
  private readonly actions: Actions<T>;
  private staleTime: number;
  private readonly watch: (callBack: (syncState: SyncState<T>) => void) => void;
  private cache: SyncCache<T> = {};
  private isCacheStale = (cacheKey: string) => {
    const _cachedData = this.cache[cacheKey];
    if (!_cachedData) {
      return true;
    }
    return Date.now() - _cachedData.timeStamp > this.staleTime;
  };

  private getCachedData = (cacheKey: string) => {
    const _cachedData = this.cache[cacheKey];
    return _cachedData.cacheData;
  };

  public query: QueryAsyncAction<T> = <P>(fn: (params?: P) => Promise<T>) => {
    const queryAction = async (params?: P) => {
      try {
        this.actions.setLoading(true);
        const res = await fn(params);
        this.actions.setData(res);
        this.actions.setLoading(false);
      } catch (error) {
        this.actions.setData(this.fallback);
        this.actions.setLoading(false);
        if (error instanceof Error) {
          this.actions.setError(error);
        } else {
          this.actions.setError(new Error(String(error)));
        }
      }
    };
    const queryAsyncAction = async (params?: P) => {
      try {
        const res = await fn(params);
        return res;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    return {
      query: (cacheKey: (string | number)[], params?: P) => {
        const _cacheKey = `${this.key}-${cacheKey.join("-")}`;
        const syncQueryAction = (params?: P) => {
          if (!this.isCacheStale(_cacheKey)) {
            const cachedData = this.getCachedData(_cacheKey);
            this.actions.setData(cachedData);
          } else {
            queryAction(params);
          }
        };
        syncQueryAction(params);
        return {
          watch: this.watch,
          sync: () => syncQueryAction(params),
        };
      },
      queryAsync: async (params?: P) => queryAsyncAction(params),
    };
  };

  public mutation: MutationAsyncAction<T> = <R>(
    fn: (request: R) => Promise<T>
  ) => {
    const mutateAction = async (request: R) => {
      try {
        this.actions.setLoading(true);
        const res = await fn(request);
        this.actions.setData(res);
      } catch (error) {
        this.actions.setLoading(false);
        if (error instanceof Error) {
          this.actions.setError(error);
        } else {
          this.actions.setError(new Error(String(error)));
        }
      }
    };
    const mutateAsyncAction = async (request: R) => {
      try {
        const res = await fn(request);
        return res;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    return {
      mutation: () => {
        return {
          watch: this.watch,
          mutate: (request: R) => mutateAction(request),
        };
      },
      mutationAsync: async (request: R) => await mutateAsyncAction(request),
    };
  };

  constructor(options: Options<T>) {
    const key = options.key ?? crypto.randomUUID();
    const neuron = new Neuron<SyncState<T>, Actions<T>>(
      {
        data: options.fallback,
        loading: false,
        error: null,
      },
      {
        key: key,
        actions: (dispatch) => ({
          setLoading: (isLoading: boolean) =>
            dispatch((mutator) => {
              mutator.state.loading = isLoading;
            }),
          setError: (error: null | Error) =>
            dispatch((mutator) => {
              mutator.state.error = error;
            }),
          setData: (data: T) =>
            dispatch((mutator) => {
              mutator.state.data = data;
            }),
        }),
      }
    );
    this.key = key;
    this.staleTime = options.staleTime ?? 0;
    this.watch = (callBack: (syncState: SyncState<T>) => void) =>
      neuron.effect((mutator) => {
        const syncState: SyncState<T> = {
          loading: mutator.state.loading,
          error: mutator.state.error,
          data: mutator.state.data,
        };
        callBack(syncState);
      });
    this.actions = neuron.getActions();
    this.fallback = options?.fallback;
  }
}
