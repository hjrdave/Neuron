import React, { ReactNode } from "react";
import { createPrivateStore } from "@sandstack/neuron/react";

export interface RowData {
  [key: string]: string | number;
}
export interface SearchParams {
  input: string;
  targetColumn: string;
}
interface State {
  columns: string[];
  data: RowData[];
  filteredData: RowData[];
  searchParams: SearchParams;
}
export interface SearchParamsQueries {
  queryData: (input: string, target: string) => void;
}
export const { usePrivateStore, useNeuron, Private } =
  createPrivateStore<State>({});

interface Props {
  children: ReactNode;
}
export default function Store({ children }: Props) {
  const { State } = usePrivateStore();

  return (
    <>
      <State<string[]> name={"columns"} state={[]} />
      <State<RowData[], SearchParamsQueries>
        name={"filteredData"}
        state={[]}
        actions={(dispatch) => ({
          queryData: (input: string, target: string) =>
            dispatch((payload) => {
              const data = payload.get<RowData[]>("data");
              if (input.length !== 0) {
                const updatedData = data.filter((item) =>
                  item[target].toString().toLowerCase().startsWith(input)
                );
                payload.state = updatedData;
              } else {
                payload.state = data;
              }
            }),
        })}
      />
      <State<RowData[]> name={"data"} state={[]} />
      <State<SearchParams>
        name={"searchParams"}
        state={{ input: "", targetColumn: "id" }}
      />
      <Private>{children}</Private>
    </>
  );
}
