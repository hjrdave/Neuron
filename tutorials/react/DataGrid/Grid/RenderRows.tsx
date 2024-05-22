import React, { Fragment } from "react";
import { useNeuron } from "./Grid.store";

export default function RenderRows() {
  const [filterdData] = useNeuron((state) => state.filteredData);
  const [columns] = useNeuron((state) => state.columns);
  const makeSureDynamicDataIsRenderSafe = (dynamicData: unknown) => {
    if (typeof dynamicData === "string" || typeof dynamicData === "number") {
      return dynamicData;
    }
    return "";
  };
  return (
    <>
      {filterdData.map((item, index) => (
        <Fragment key={index}>
          <tr>
            {columns.map((column, index) => (
              <td
                key={index}
                style={{
                  color: "white",
                  padding: ".5rem",
                  border: "1px solid grey",
                  borderCollapse: "collapse",
                }}
              >
                {makeSureDynamicDataIsRenderSafe(item[column])}
              </td>
            ))}
          </tr>
        </Fragment>
      ))}
    </>
  );
}
