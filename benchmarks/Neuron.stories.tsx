import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import { default as Comp } from "./Neuron";

export default {
  title: "React Benchmarks/Neuron",
  component: Comp,
} as Meta<typeof Comp>;

const BigListTemplate: StoryFn<typeof Comp> = () => <Comp />;
export const BigList = BigListTemplate.bind({});
BigList.args = {};
