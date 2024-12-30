import { Module } from "../core";

export interface ShallowFeatures {
  shallow?: boolean;
}

export const shallowEqual = <T>(a: T, b: T) => {
  if (
    typeof a !== "object" ||
    a === null ||
    typeof b !== "object" ||
    b === null
  ) {
    return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }
    return true;
  }

  if (!Array.isArray(a) && !Array.isArray(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (a[key] !== b[key]) {
        return false;
      }
    }
    return true;
  }

  return false;
};

export const Shallow = () =>
  new Module({
    name: "@sandstack/neuron-shallow",
    onDispatch: (payload) => {
      const dispatchShouldCancel = shallowEqual(
        payload.prevState,
        payload.state
      );
      if (dispatchShouldCancel) {
        payload.cancelDispatch();
      }
    },
  });
