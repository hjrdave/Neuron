import { Neuron } from "../core";
import {
  Options,
  INeuronSync,
  QueryAsyncAction,
  SyncState,
  Actions,
  MutationAsyncAction,
} from "./INeuronSync";

export class NeuronSync<T> implements INeuronSync<T> {
  private readonly actions: Actions<T>;
  private readonly watch: (callBack: (syncState: SyncState<T>) => void) => void;

  public query: QueryAsyncAction<T> = <P>(fn: (params?: P) => Promise<T>) => {
    const queryAction = async (params?: P) => {
      try {
        this.actions.setLoading(true);
        const res = await fn(params);
        this.actions.setData(res);
        this.actions.setLoading(false);
      } catch (error) {
        this.actions.setLoading(false);
        if (error instanceof Error) {
          this.actions.setError(error);
        } else {
          this.actions.setError(new Error(String(error)));
        }
        this.actions.setLoading(false);
      }
    };
    return {
      query: (params?: P) => {
        queryAction(params);
        return {
          watch: this.watch,
          sync: () => queryAction(params),
        };
      },
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
    return {
      mutation: () => {
        return {
          watch: this.watch,
          mutate: (request: R) => mutateAction(request),
        };
      },
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
