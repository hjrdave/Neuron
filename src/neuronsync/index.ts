import { default as _NeuronSync } from "./NeuronSync";
import { Bridge } from "../vanilla/vanilla.interfaces";

function NeuronSync<S>(bridge: Bridge<S>) {
  return new _NeuronSync(bridge as any);
}

export default NeuronSync;
