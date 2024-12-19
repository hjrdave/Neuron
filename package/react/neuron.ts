import { NeuronInstance, IModule, Neuron, NeuronOptions } from "../core";
import { useSubscriber } from "./useSubscriber";
export const neuron = <T, A, F>(
  initialState: T,
  options?: NeuronOptions<T, A, F>,
  modules?: IModule<F>[],
  clientNeuron?: NeuronInstance<F>
) => {
  const neuronCore =
    clientNeuron?.(initialState, options) ??
    new Neuron(initialState, options, modules);
  return <S>(slice?: (state: T) => S) =>
    useSubscriber<T, A, F, S>(neuronCore, slice);
};
