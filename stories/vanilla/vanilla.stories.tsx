import React, { useState, useEffect } from "react";
import { StoryFn, Meta } from "@storybook/react";
import { createStore } from "../../package/vanilla";

const Store = createStore();
Store.add({
  key: "foo",
  state: "foo bar choo",
});

export default {
  title: "Test NPM Package/vanilla",
} as Meta;

const VanillaTemplate: StoryFn = () => {
  const [foo, setFoo] = useState<string>(Store.get("foo"));
  useEffect(() => {
    Store.onDispatch((payload) => {
      if (payload.key === "foo") {
        setFoo(payload.state as string);
      }
    });
  }, []);
  return (
    <>
      <p>Foo: {foo}</p>
      <button onClick={() => Store.set("foo", "Fee Fye Fo Thumb")}>Foo</button>
    </>
  );
};
export const Vanilla = VanillaTemplate.bind({});
VanillaTemplate.args = {};
