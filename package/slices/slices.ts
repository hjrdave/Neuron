import { createModule, Store } from "../vanilla";
import type { Payload } from "../vanilla";

export type Selector<T, S> = (store: S) => T;

interface DispatchData<T, S> {
  selector?: Selector<T, S>;
  newSliceState?: T;
}

const selectorToArray = <T, S>(selector: Selector<T, S>) => {
  const funcToSelectorString = selector
    ?.toString()
    .match(/\(\w+\) =>\s*(\S+)/)?.[1];

  const selectorArray =
    typeof funcToSelectorString === "string"
      ? funcToSelectorString?.split(".")
      : [] ?? [];
  return selectorArray;
  return [];
};
export const convertSelector = <T, S, SelectorKey extends keyof S>(
  selector: Selector<T, S>
) => {
  const selectorArray = selectorToArray(selector);
  const selectorKey = selectorArray[1] as SelectorKey;
  return selectorKey;
};

export const convertActionSelector = <T, A, ActionKey extends keyof A>(
  selector: Selector<T, A>
) => {
  const actionArray = selectorToArray(selector);
  const actionKey = actionArray[1] as ActionKey;
  return actionKey;
};

export const getSlice = <T, S, A>(
  selector: Selector<T, S>,
  Store: Store<S, A>
) => {
  const state = Store.getStore().reduce(
    (acc, item) => ({ ...acc, [item.key]: item.state }),
    {}
  ) as S & A;
  return selector(state);
};

export const setSlice = <T, S, A>(
  selector: Selector<T, S>,
  newState: T,
  Store: Store<S, A>
) => {
  Store.dispatch(convertSelector(selector), (payload) => {
    payload.data = {
      selector: selector,
      newSliceState: newState,
    };
  });
};

export const updateStateWithSlice = <T, S>(
  selector: Selector<T, S>,
  state: T
): T => {
  const pathArray = selector.toString().split(".").slice(2);
  return pathArray.reduce((slice, key) => slice?.[key], state);
};

const deepStateUpdate = <T, S, A, SelectorKey extends keyof S>(
  payload: Payload<S, A, SelectorKey>
) => {
  const storeState = payload?.prevState;
  const dispatchData = payload?.data as DispatchData<T, S>;
  const { selector, newSliceState } = dispatchData;
  if (selector) {
    const selectorArray = selectorToArray(selector);
    const getAllStoreState = () => {
      let allState = {};
      const storeItems = payload.getStore();
      storeItems.map((item) => {
        allState = { ...allState, [item.key]: item.state };
      });
      return allState as S;
    };
    const allStoreState = getAllStoreState();
    const currentSlice = selector?.(allStoreState);
    if (currentSlice !== newSliceState) {
      const deepUpdate = (
        propPath: string[],
        value: T | undefined,
        objToUpdate: S[SelectorKey]
      ) => {
        const propAmount = propPath.length;
        for (let i = 0; i < propAmount - 1; i++) {
          const elem = propPath[i];
          if (!objToUpdate[elem]) {
            objToUpdate[elem] = {};
          } else {
            objToUpdate = objToUpdate[elem];
          }
        }
        objToUpdate[propPath[propAmount - 1]] = value;
      };
      const storeStateClone = { ...storeState } as S[SelectorKey];
      deepUpdate(selectorArray, newSliceState, storeStateClone);
      payload.state = storeStateClone;
    }
  }
};

export const Slices = createModule({
  name: "slices",
  onRun: (payload) => deepStateUpdate(payload),
});
