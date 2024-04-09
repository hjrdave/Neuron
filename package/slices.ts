import {
  Slices,
  convertSelector,
  getSlice,
  setSlice,
  updateStateWithSlice,
} from "./slices/index";
import type { Selector } from "./slices/index";
export type { Selector };
export { Slices, convertSelector, getSlice, setSlice, updateStateWithSlice };
//used for cdns that are used in browser script tags
globalThis["NeuronSlices"] = {
  Slices,
  convertSelector,
  getSlice,
  setSlice,
  updateStateWithSlice,
};
