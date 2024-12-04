import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import SingleNeuronCounterApp from "./SingleNeuronCounter";
import ClientNeuronCounterApp from "./ClientNeuronCounter";
import PrivateNeuronCounterApp from "./PrivateNeuronCounter";

export default {
  title: "React Tutorials/Counter",
  component: SingleNeuronCounterApp,
} as Meta<typeof SingleNeuronCounterApp>;

const SingleNeuronTemplate: StoryFn<typeof SingleNeuronCounterApp> = () => (
  <SingleNeuronCounterApp />
);
export const SingleNeuron = SingleNeuronTemplate.bind({});
SingleNeuron.args = {};

const ClientNeuronTemplate: StoryFn<typeof ClientNeuronCounterApp> = () => (
  <ClientNeuronCounterApp />
);
export const ClientNeuron = ClientNeuronTemplate.bind({});
ClientNeuron.args = {};

const PrivateNeuronTemplate: StoryFn<typeof PrivateNeuronCounterApp> = () => (
  <PrivateNeuronCounterApp />
);
export const PrivateNeuron = PrivateNeuronTemplate.bind({});
PrivateNeuron.args = {};
