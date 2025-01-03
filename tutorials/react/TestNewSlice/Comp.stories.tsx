import React from "react";
import { StoryFn, Meta } from "@storybook/react";

import { default as Comp } from "./Comp";

export default {
  title: "React Tutorials/TestSlice",
  component: Comp,
} as Meta<typeof Comp>;

const PrimaryTemplate: StoryFn<typeof Comp> = () => <Comp />;
export const Primary = PrimaryTemplate.bind({});
Primary.args = {};
