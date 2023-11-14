import React, { useState, useEffect } from "react";
import { StoryFn, Meta } from "@storybook/react";
import Neuron from "@sandstack/neuron";

const store = Neuron.Store();
store.add({
  key: "foo",
  state: "foo bar choo",
});

export default {
  title: "Test NPM Package/vanilla",
} as Meta;

const VanillaTemplate: StoryFn = () => {
  const [foo, setFoo] = useState(store.get("foo"));
  useEffect(() => {
    store.onDispatch((payload) => {
      if (payload.key === "foo") {
        setFoo(payload.state as any);
      }
    });
  }, []);
  return (
    <>
      <p>Foo: {foo as any}</p>
      <button onClick={() => store.set("foo", "Fee Fye Fo Thumb")}>Foo</button>
    </>
  );
};
export const Vanilla = VanillaTemplate.bind({});
VanillaTemplate.args = {};
