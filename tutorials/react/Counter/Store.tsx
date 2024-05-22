import React from "react";
import { createStore } from "@sandstack/neuron/react";

interface State {
  counter: number;
}
export const { State, useNeuron } = createStore<State>();

export default function Store() {
  return (
    <>
      <State name={"counter"} state={0} />
    </>
  );
}
