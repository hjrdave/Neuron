import {
  Shallow,
  ShallowFeatures,
  shallowEqual,
} from "../package/shallow/index";

export type { ShallowFeatures };
export { Shallow, shallowEqual };
globalThis["NeuronShallow"] = {
  Shallow,
  shallowEqual,
};
