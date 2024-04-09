import type { PersistProps } from "./persist/index";
import { Persist } from "./persist/index";
export { PersistProps };
export { Persist };
globalThis["NeuronPersist"] = {
  Persist,
};
