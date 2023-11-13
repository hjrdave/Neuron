import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import Neuron from "@sandstack/neuron/react";

export default {
  title: "Test NPM Package/react",
} as Meta;

const { State, useNeuron } = Neuron.Store();

const ReactStore = () => {
  return (
    <>
      <State name={"foo"} state={"fee"} />
    </>
  );
};

const ChildComp = () => {
  const [foo, setFoo] = useNeuron<string>("foo");
  return (
    <>
      <p>Foo: {foo}</p>
      <button onClick={() => setFoo("Foo Bar Choo Choo")}>Foo</button>
    </>
  );
};

const ReactTemplate: StoryFn = () => {
  return (
    <>
      <ReactStore />
      <ChildComp />
    </>
  );
};
export const NeuronReact = ReactTemplate.bind({});
ReactTemplate.args = {};
