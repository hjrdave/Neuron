import { NeuronClient } from "./NeuronClient";
import { Neuron, NeuronOptions } from "./Neuron";
import { IModule, Module } from "./Module";

function neuron<T, A, F>(
  initialState: T,
  options?: NeuronOptions<T, A, F>,
  modules?: IModule<F>[]
) {
  return new Neuron<T, A, F>(initialState, options, modules);
}
export { neuron, NeuronClient, Module };
