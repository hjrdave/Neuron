import React from "react";
import { ReactNode } from "react";
import { PrivateNeuronClient } from "../../../../package/react";

const { privateNeuron, usePrivateNeuron } = new PrivateNeuronClient();

export interface ListData {
  postId: number;
  name: string;
  body: string;
}

interface Props {
  children: ReactNode;
  name: string;
  listData: ListData[];
}
export const [useInitListData, useListData] = privateNeuron<ListData[]>();
export default function ListProvider({ children, name, listData }: Props) {
  const { Private, storeInstance } = usePrivateNeuron({
    name: `store-${name}`,
  });
  useInitListData(listData, storeInstance);
  return <Private>{children}</Private>;
}
