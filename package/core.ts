import {
  NeuronInstance,
  NeuronClient,
  ClientName,
  ConnectToClient,
  INeuronClient,
  Neuron,
  INeuron,
  NeuronKey,
  NeuronOptions,
  IPayload,
  Module,
  IModule,
} from "./core/index";

export type {
  IPayload,
  NeuronKey,
  INeuron,
  NeuronOptions,
  IModule,
  NeuronInstance,
  ClientName,
  ConnectToClient,
  INeuronClient,
};
export { Neuron, NeuronClient, Module };
globalThis["NeuronCore"] = {
  NeuronClient,
  Neuron,
  Module,
};
