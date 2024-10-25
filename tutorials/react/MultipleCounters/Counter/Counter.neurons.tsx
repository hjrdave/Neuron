import React from "react";
import { ReactNode } from "react";
import { PrivateNeuronClient } from "../../../../package/react/privateNeuron/PrivateNeuronClient";

const { privateNeuron, usePrivateNeuron } = new PrivateNeuronClient();

interface CountActions {
  increment: () => void;
  decrement: () => void;
}
export const [useInitCount, useCount] = privateNeuron<number, CountActions>({
  actions: (dispatch) => ({
    increment: () =>
      dispatch((payload) => {
        payload.state = payload.prevState + 1;
      }),
    decrement: () =>
      dispatch((payload) => {
        payload.state = payload.prevState - 1;
      }),
  }),
});

export const [useInitPerson, usePerson] = privateNeuron<{
  name: string;
  age: number;
}>();

export default function Provider({
  children,
  id,
}: {
  children: ReactNode;
  id?: string;
}) {
  const { Private, connect } = usePrivateNeuron({
    name: `store-${id}`,
  });
  useInitCount(0, connect);
  useInitPerson({ name: "Bob", age: 46 }, connect);

  return <Private>{children}</Private>;
}
