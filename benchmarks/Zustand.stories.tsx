import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import { default as Comp } from "./Zustand";

export default {
  title: "React Benchmarks/Zustand",
  component: Comp,
} as Meta<typeof Comp>;

const BigListTemplate: StoryFn<typeof Comp> = () => <Comp />;
export const BigList = BigListTemplate.bind({});
BigList.args = {};
