import { useState } from "react";
import { Store as CoreStore } from "../vanilla";
import { convertSelector, getSlice, updateStateWithSlice } from "../slices";

export const useNeuronNew = <S, A, T, AT>(
  selector: (store: S) => T,
  Store: CoreStore<S, A>
) => {
  const selectorKey = convertSelector<T, S, keyof S>(
    selector as any
  ) as keyof S & keyof A;
  const [state, setState] = useState(getSlice<T, S, A>(selector as any, Store));
  const actions = Store.getActions(selectorKey as unknown as keyof A);

  Store.onDispatch((payload) => {
    if (payload.key === selectorKey) {
      const newState = payload.state as T;
      const newSliceState = updateStateWithSlice<T, S>(
        selector as any,
        newState
      );
      setState(newSliceState);
    }
  });
  return [state, actions] as [T, AT];
};
