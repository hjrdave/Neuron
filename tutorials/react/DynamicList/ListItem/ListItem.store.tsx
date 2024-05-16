import React from "react";
import { createPrivateStore } from "@sandstack/neuron/react";

interface ClassMate {
  id: string;
  name: string;
  birthDate: Date;
  age: number;
  gender: "male" | "female";
}
interface State {
  classMate: ClassMate;
}
export const { useNeuron, Private, usePrivateStore } =
  createPrivateStore<State>({});

export default function Store({ children }: { children: React.ReactNode }) {
  const { State } = usePrivateStore();
  return (
    <>
      <State<ClassMate>
        name={"classMate"}
        state={{
          id: "",
          name: "",
          birthDate: new Date(),
          age: 0,
          gender: "male",
        }}
      />
      <Private>{children}</Private>
    </>
  );
}
