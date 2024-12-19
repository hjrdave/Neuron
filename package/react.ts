import { neuron, NeuronClient, PrivateNeuronClient } from "./react/index";
export { neuron, NeuronClient, PrivateNeuronClient };
globalThis["ReactNeuron"] = {
  neuron,
  NeuronClient,
  PrivateNeuronClient,
};
