import Devtools from "./modules/devtools";
import Persist, { PersistProps } from "./modules/persist";
import Slices, {
  Selector,
  convertSelector,
  getSlice,
  setSlice,
  updateStateWithSlice,
} from "./modules/slices";

export type { PersistProps, Selector };
export {
  Devtools,
  Persist,
  Slices,
  convertSelector,
  getSlice,
  setSlice,
  updateStateWithSlice,
};
