import { StoryFn, Meta } from "@storybook/react";
import NeuronGSM from "@sandstack/neuron/react";

export default {
  title: "Test NPM Package/react",
} as Meta;

const { State, useNeuron } = NeuronGSM.Store();

const ReactStore = () => {
  return (
    <>
      <State
        name={"foo"}
        state={{
          foo: "",
          fee: "",
        }}
      />
    </>
  );
};

const ChildComp = () => {
  const [, setFoo] = useNeuron<string>("foo");
  return (
    <>
      <p>Foo: </p>
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
