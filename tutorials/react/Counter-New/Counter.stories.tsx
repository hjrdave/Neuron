import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import { default as Comp } from "./App";

export default {
  title: "React Tutorials/Counter-New",
  component: Comp,
} as Meta<typeof Comp>;

const PrimaryTemplate: StoryFn<typeof Comp> = () => <Comp />;
export const Primary = PrimaryTemplate.bind({});
Primary.args = {};
