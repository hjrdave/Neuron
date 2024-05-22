import React, { Fragment } from "react";
import { useNeuron } from "./Grid.store";

export default function Columns() {
  const [columns] = useNeuron((state) => state.columns);
  return (
    <>
      <tr>
        {columns.map((column, index) => (
          <Fragment key={index}>
            <th
              style={{
                textAlign: "left",
                textTransform: "capitalize",
                color: "black",
                padding: ".5rem",
                backgroundColor: "grey",
              }}
            >
              {column
                .slice(0, 1)
                .toUpperCase()
                .concat(column.slice(1, column.length))}
            </th>
          </Fragment>
        ))}
      </tr>
    </>
  );
}
