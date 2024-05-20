import React, { ReactNode } from "react";
import { createPrivateStore } from "@sandstack/neuron/react";

export interface RowData {
  [key: string]: string | number;
}
interface State {
  columns: string[];
  data: RowData[];
}
export const { usePrivateStore, useNeuron, Private } =
  createPrivateStore<State>({});

export default function Store({ children }: { children: ReactNode }) {
  const { State } = usePrivateStore();

  return (
    <>
      <State<string[]> name={"columns"} state={[]} />
      <State<RowData[]> name={"data"} state={[]} />
      <Private>{children}</Private>
    </>
  );
}
