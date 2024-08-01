import { createModule } from "../vanilla";
import type { SelectorKey, Payload as TPayload } from "../vanilla";
export type Payload = TPayload<
  { [key: string]: unknown },
  { [key: string]: unknown },
  SelectorKey<{ [key: string]: unknown }>
>;

export interface ShallowProps {
  shallow?: boolean;
}

const moduleName = `@sandstack/neuron-shallow`; //need a unique id that is passed by store

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

const runShallowCheck = (payload: Payload) => {
  const dispatchShouldCancel = shallowEqual(payload.prevState, payload.state);
  if (dispatchShouldCancel) {
    payload.cancelDispatch();
  }
};

const Shallow = createModule({
  name: moduleName,
  onRun: (payload) => {
    const features = payload.features as ShallowProps;
    const isEnabled = features?.shallow;
    if (isEnabled) {
      runShallowCheck(payload);
    }
  },
});
export default Shallow;
