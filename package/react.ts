import { NeuronClient } from "./react/NeuronClient";
import { PrivateNeuronClient } from "./react/privateNeuron/PrivateNeuronClient";
export { NeuronClient, PrivateNeuronClient };
globalThis["NeuronReact"] = {
  NeuronClient,
  PrivateNeuronClient,
};
