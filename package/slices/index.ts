import Slices, {
  convertSelector,
  getSlice,
  setSlice,
  updateStateWithSlice,
} from "./slices";
import type { Selector } from "./slices";

export type { Selector };
export { convertSelector, getSlice, setSlice, updateStateWithSlice };
export default Slices;
