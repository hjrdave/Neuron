import React from "react";
import { useColumns, useData, useFilteredData, RowData } from "./Grid.store";
interface Props {
  columns: string[];
  data: RowData[];
}
export default function GridProvider({ columns, data }: Props) {
  const [, { set: setColumns }] = useColumns();
  const [, { set: setFilteredData }] = useData();
  const [, { set: setData }] = useFilteredData();
  React.useEffect(() => {
    setColumns(columns);
    setFilteredData(data);
    setData(data);
  }, [columns, data]);
  return null;
}
