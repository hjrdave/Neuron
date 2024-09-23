import { NeuronClient } from "../../../package/react";

const { neuron } = new NeuronClient({ name: "fooStore", modules: [] });

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
