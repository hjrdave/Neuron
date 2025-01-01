import { NeuronInstance, Neuron, NeuronOptions } from "../core";
import { useSubscriber } from "./useSubscriber";
export const neuron = <T, A = unknown>(
  initialState: T,
  options?: NeuronOptions<T, A>,
  clientNeuron?: NeuronInstance
) => {
  const neuronCore =
    clientNeuron?.(initialState, options) ?? new Neuron(initialState, options);
  return <S>(slice?: (state: T) => S) =>
    useSubscriber<T, A, S>(neuronCore, slice);
};
