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
              {column}
            </th>
          </Fragment>
        ))}
      </tr>
    </>
  );
}
