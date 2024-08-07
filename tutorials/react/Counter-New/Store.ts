import { NeuronClient } from "../../../package/client/NeuronClient";

const { neuron } = new NeuronClient();

//private neurons are default
export const useCount = neuron(0, {
  actions: (dispatch) => ({
    increment: () =>
      dispatch((payload) => {
        payload.state = payload.prevState + 1;
      }),
    decrement: () =>
      dispatch((payload) => {
        payload.state = payload.prevState - 1;
      }),
  }),
});

export const useFruit = neuron("apple");

export const usePerson = neuron({ name: "Bob", age: 36, job: "Developer" });
