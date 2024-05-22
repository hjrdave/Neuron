import React from "react";
import { useNeuron, RowData } from "./Grid.store";
interface Props {
  columns: string[];
  data: RowData[];
}
export default function GridProvider({ columns, data }: Props) {
  const [, setColumns] = useNeuron((state) => state.columns);
  const [, setData] = useNeuron((state) => state.data);
  const [, setFilteredData] = useNeuron((state) => state.filteredData);
  React.useEffect(() => {
    setColumns(columns);
    setFilteredData(data);
    setData(data);
  }, [columns, data]);
  return null;
}
