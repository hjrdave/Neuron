import { createModule, SelectorKey, Store, Payload } from "../vanilla";

export type Selector<State = { [key: string]: unknown }, T = unknown> = (
  store: State
) => T;

interface DispatchData<State> {
  selector: Selector<State>;
  newSliceState?: unknown;
}

export const convertSelector = <State>(
  selector: SelectorKey<State> | Selector<State>
) => {
  const selectorArray =
      (
        selector?.toString().match(/return\s+([a-zA-Z0-9_$.]+)\s*;/)?.[1] ??
        selector?.toString()
      )?.split(".") || [],
    selectorKey = (
      selectorArray.length <= 1 ? selector : selectorArray[1]
    ) as SelectorKey<State>,
    isSlice = selectorArray.length > 2;

  return {
    key: selectorKey,
    isSlice: isSlice,
  };
};

export const getSlice = <T, State>(
  selector: Selector<State>,
  Store: Store<State>
): T => {
  const state: State = Store.getStore().reduce(
    (acc, item) => ({ ...acc, [item.key]: item.state }),
    {} as State
  );
  return selector(state) as T;
};

export const setSlice = <T, State>(
  selector: Selector<State>,
  newState: T,
  Store: Store<State>
) => {
  Store.dispatch<DispatchData<State>>(
    convertSelector<State>(selector).key,
    (payload) => {
      payload.data = {
        selector: selector,
        newSliceState: newState,
      };
    }
  );
};

export const updateStateWithSlice = <State>(
  selector: Selector<State>,
  state: State
): unknown => {
  const pathArray = selector.toString().split(".").slice(2);
  return pathArray.reduce((slice, key) => slice?.[key], state);
};

const deepStateUpdate = (payload: Payload) => {
  const storeState = payload?.prevState;
  const dispatchData = payload?.data;
  if (
    typeof storeState === "object" &&
    dispatchData?.selector !== undefined &&
    dispatchData?.newSliceState !== undefined
  ) {
    const { selector, newSliceState } = dispatchData;
    const selectorToArray: string[] =
      (
        selector?.toString().match(/return\s+([a-zA-Z0-9_$.]+)\s*;/)?.[1] ??
        selector?.toString()
      )?.split(".") || [];

    const getAllStoreState = () => {
      let allState = {};
      payload.getStore().map((item) => {
        allState = { ...allState, [item.key]: item.state };
      });
      return allState;
    };
    // @ts-expect-error - A selector could be "(prev) => void"
    const currentSlice = selector?.(getAllStoreState());
    const newSlice =
      typeof newSliceState === "function"
        ? newSliceState?.(currentSlice)
        : newSliceState;
    if (currentSlice !== newSlice) {
      const deepUpdate = (
        propPath: string[],
        value: unknown,
        objToUpdate: { [key: string]: unknown }
      ) => {
        const propAmount = propPath.length;
        for (let i = 0; i < propAmount - 1; i++) {
          const elem = propPath[i];
          if (!objToUpdate[elem]) {
            objToUpdate[elem] = {};
          } else {
            objToUpdate = objToUpdate[elem] as { [key: string]: unknown };
          }
        }
        objToUpdate[propPath[propAmount - 1]] = value;
      };
      const storeStateClone = { ...storeState };
      deepUpdate(selectorToArray.slice(2), newSlice, storeStateClone);
      payload.state = storeStateClone;
    }
  }
};

export const Slices = createModule({
  name: "slices",
  onRun: (payload) => deepStateUpdate(payload),
});
