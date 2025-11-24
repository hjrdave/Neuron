import { Neuron, NeuronKey } from "../core";
import {
  Options,
  INeuronSync,
  QueryAsyncAction,
  SyncState,
  Actions,
  MutationAsyncAction,
  CachedData,
} from "./INeuronSync";

export class NeuronSync<T> implements INeuronSync<T> {
  private readonly key: NeuronKey;
  private readonly actions: Actions<T>;
  private readonly watch: (callBack: (syncState: SyncState<T>) => void) => void;
  private cache: CachedData<T> | null = null;
  private shouldCacheBreak = (cacheKey: string) =>
    this.cache?.cacheKey !== cacheKey;
  private getCachedData = () => this.cache?.data;
  private setCachedData = (cacheKey: string, data: T) => {
    this.cache = {
      cacheKey: cacheKey,
      timeStamp: new Date(),
      data: data,
    };
  };

  public query: QueryAsyncAction<T> = <P>(fn: (params: P) => Promise<T>) => {
    const action = async (params: P, cacheKey: string) => {
      try {
        this.actions.setLoading(true);
        const res = await fn(params);
        this.actions.setData(res);
        this.setCachedData(cacheKey, res);
        this.actions.setLoading(false);
      } catch (error) {
        this.actions.setData(this.fallback);
        this.setCachedData(cacheKey, this.fallback);
        this.actions.setLoading(false);
        if (error instanceof Error) {
          this.actions.setError(error);
        } else {
          this.actions.setError(new Error(String(error)));
        }
      }
    };
    const asyncAction = async (params: P) => {
      try {
        const res = await fn(params);
        return res;
      } catch (error) {
        console.error(error);
        throw error;
      }
    };
    return {
      query: (cacheKey, params, options) => {
        const _cacheKey = `${this.key}-${cacheKey.join("-")}`;
        const syncAction = (params: P) => {
          if (!this.shouldCacheBreak(_cacheKey)) {
            const cachedData = this.getCachedData();
            if (cachedData) {
              this.actions.setData(cachedData);
            }
          } else {
            action(params, _cacheKey);
          }
        };
        syncAction(params);
        return {
          watch: this.watch,
          sync: () => syncAction(params),
        };
      },
      queryAsync: async (params: P) => asyncAction(params),
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
        data: null,
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
  }
}
