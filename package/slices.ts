import type { Selector } from "./slices/index";
import {
  Slices,
  convertSelector,
  getSlice,
  setSlice,
  updateStateWithSlice,
} from "./slices/index";

export type { Selector };
export { Slices, convertSelector, getSlice, setSlice, updateStateWithSlice };
