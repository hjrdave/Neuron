import { Persist } from "./persist/index";
import type { PersistFeatures } from "./persist/index";

export type { PersistFeatures };
export { Persist };

globalThis["NeuronPersist"] = {
  Persist,
};
