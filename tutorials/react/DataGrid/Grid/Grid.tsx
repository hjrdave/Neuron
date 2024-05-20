import React from "react";
import Store from "./Grid.store";
import GridProvider from "./GridProvider";
import Columns from "./Columns";
import RenderRow from "./RenderRows";
interface Props {
  columns: string[];
  data: {
    [key: string]: string | number;
  }[];
}
export default function Grid({ columns, data }: Props) {
  return (
    <>
      <Store>
        <GridProvider columns={columns} data={data} />
        <table>
          <Columns />
          <RenderRow />
        </table>
      </Store>
    </>
  );
}
