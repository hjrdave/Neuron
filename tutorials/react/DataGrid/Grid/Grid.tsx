import React from "react";
import Store, { RowData } from "./Grid.store";
import GridProvider from "./GridProvider";
import Columns from "./Columns";
import RenderRows from "./RenderRows";
import Search from "./Search";
interface Props {
  columns: string[];
  data: RowData[];
}
export default function Grid({ columns, data }: Props) {
  return (
    <>
      <Store index={0}>
        <GridProvider columns={columns} data={data} />
        <div style={{}}>
          <Search />
          <div
            style={{
              overflowY: "scroll",
              maxHeight: "600px",
              display: "block",
            }}
          >
            <table
              style={{
                width: "100%",
              }}
            >
              <thead>
                <Columns />
              </thead>
              <tbody>
                <RenderRows />
              </tbody>
            </table>
          </div>
        </div>
      </Store>
    </>
  );
}
