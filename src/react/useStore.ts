import React from "react";
import { Store as CoreStore } from "../core";

export type UseStore<State = { [key: string]: unknown }> = (
  Store: CoreStore<State>
) => [{ [key: string]: unknown }, unknown];

const useStore = <State>(Store: CoreStore<State>) => {
  const getAllStoreState = () => {
      let state = {};
      Store.getStore().map((item) => {
        state = {
          ...state,
          [item.key]: item.state,
        };
      });
      return state;
    },
    [state, _setState] = React.useState(getAllStoreState()),
    store = {
      set: Store.set,
      get: Store.get,
      dispatch: Store.dispatch,
      onDispatch: Store.onDispatch,
      add: Store.add,
      getActions: Store.getActions,
      has: Store.has,
      use: Store.use,
    };
  React.useEffect(() => {
    Store?.onDispatch((payload) => {
      _setState({ ...state, [payload.key]: payload.state });
    });
  }, []);

  return [state, store] as [{ [key: string]: unknown }, typeof store];
};

export default useStore;
