import {
  NeuronInstance,
  NeuronClient,
  ClientName,
  ClientMethods,
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
  ClientMethods,
  INeuronClient,
};
export { Neuron, NeuronClient, Module };
globalThis["NeuronCore"] = {
  NeuronClient,
  Neuron,
  Module,
};
