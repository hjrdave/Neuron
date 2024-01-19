import { createModule, Store } from "../vanilla";
import type { Payload } from "../vanilla";
import type { SelectorKey, StateType } from "../vanilla/Interfaces";

export type Selector<S = StateType, T = unknown> = (store: S) => T;

interface DispatchData<S> {
  selector: Selector<S>;
  newSliceState?: unknown;
}

export const convertSelector = <S>(selector: SelectorKey<S> | Selector<S>) => {
  const selectorArray =
      (
        selector?.toString().match(/return\s+([a-zA-Z0-9_$.]+)\s*;/)?.[1] ??
        selector?.toString()
      )?.split(".") || [],
    selectorKey = (
      selectorArray.length <= 1 ? selector : selectorArray[1]
    ) as SelectorKey<S>,
    isSlice = selectorArray.length > 2;

  return {
    key: selectorKey,
    isSlice: isSlice,
  };
};

export const getSlice = <T, S>(selector: Selector<S>, Store: Store<S>): T => {
  const state: S = Store.getStore().reduce(
    (acc, item) => ({ ...acc, [item.key]: item.state }),
    {} as S
  );
  return selector(state) as T;
};

export const setSlice = <T, S>(
  selector: Selector<S>,
  newState: T,
  Store: Store<S>
) => {
  Store.dispatch<DispatchData<S>>(
    convertSelector<S>(selector).key,
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
  onRun: (payload) => deepStateUpdate(payload as Payload),
});
