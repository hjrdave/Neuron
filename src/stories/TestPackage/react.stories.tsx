//import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import NeuronGSM from "@sandstack/neuron/react";

export default {
  title: "Test NPM Package/react",
} as Meta;

const { State, useNeuron } = NeuronGSM.Store();

const ReactStore = () => {
  return (
    <>
      <State name={"foo"} state={"foobar"} />
    </>
  );
};

const ChildComp = () => {
  const [foo, setFoo] = useNeuron("foo");
  return (
    <>
      <p>Foo: {foo as any}</p>
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
export const React = ReactTemplate.bind({});
ReactTemplate.args = {};
