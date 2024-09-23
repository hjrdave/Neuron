import React, { useEffect } from "react";
import { ReactNode } from "react";
import { PrivateNeuronClient } from "../../../../package/react";

const { privateNeuron, usePrivateNeuron } = new PrivateNeuronClient();

export interface SearchParams {
  input: string;
  targetColumn: string;
}
export interface RowData {
  [key: string]: string | number;
}
export interface SearchParams {
  input: string;
  targetColumn: string;
}

export const [addColumns, useColumns] = privateNeuron<string[]>();
export const [addData, useData] = privateNeuron<RowData[]>({ key: "data" });
export const [addFilteredData, useFilteredData] = privateNeuron<RowData[]>({
  actions: (dispatch) => ({
    queryData: (input: string, target: string) =>
      dispatch((payload) => {
        const data = payload.get("data");
        if (input.length !== 0) {
          const updatedData = data.filter((item) =>
            item[target].toString().toLowerCase().startsWith(input)
          );
          payload.state = updatedData;
        } else {
          payload.state = data;
        }
      }),
  }),
});
export const [addSearchParams, useSearchParams] = privateNeuron<SearchParams>();
export default function Store({
  children,
  index,
}: {
  children: ReactNode;
  index: number;
}) {
  const { Private } = usePrivateNeuron({ name: `store-${index}` });
  useEffect(() => {
    addColumns([]);
    addData([]);
    addFilteredData([]);
    addSearchParams({ input: "", targetColumn: "id" });
  }, []);
  return <Private>{children}</Private>;
}
