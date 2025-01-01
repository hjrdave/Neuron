import { Shallow, ShallowFeatures, shallowEqual } from "./shallow";

export type { ShallowFeatures };
export { Shallow, shallowEqual };
globalThis["NeuronShallow"] = {
  Shallow,
  shallowEqual,
};
