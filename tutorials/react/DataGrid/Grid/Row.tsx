import React from "react";
import { RowData } from "./Grid.store";

interface Props {
  fieldData: RowData;
}
export default function Row({ fieldData }: Props) {
  const data = Object.entries(fieldData);
  return (
    <>
      <tr>
        {data.map((content) => (
          <td
            style={{
              color: "white",
              padding: ".5rem",
              border: "1px solid grey",
              borderCollapse: "collapse",
            }}
          >
            {content[1]}
          </td>
        ))}
      </tr>
    </>
  );
}
