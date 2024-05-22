import React from "react";
import { RowData, SearchParamsQueries, useNeuron } from "./Grid.store";

export default function Search() {
  const [columns] = useNeuron((state) => state.columns);
  const [, , { queryData }] = useNeuron<RowData[], SearchParamsQueries>(
    (state) => state.filteredData
  );
  const [input, setInput] = useNeuron((state) => state.searchParams.input);
  const [targetColumn, setTargetColumn] = useNeuron(
    (state) => state.searchParams.targetColumn
  );
  React.useEffect(() => {
    queryData(input, targetColumn);
  }, [input, targetColumn]);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignContent: "center",
          paddingBottom: ".5rem",
        }}
      >
        <p
          style={{
            paddingRight: "1rem",
            marginBottom: "0rem",
            color: "white",
          }}
        >
          Search for{" "}
        </p>
        <div style={{ paddingRight: "1rem" }}>
          <input
            type="text"
            style={{ marginTop: ".9rem" }}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <p
          style={{ paddingRight: "1rem", marginBottom: "0rem", color: "white" }}
        >
          in{" "}
        </p>
        <div>
          <select
            style={{ marginTop: ".9rem" }}
            onChange={(e) => setTargetColumn(e.target.value)}
          >
            {columns.map((column, index) => (
              <option key={index} value={column}>
                {column
                  .slice(0, 1)
                  .toUpperCase()
                  .concat(column.slice(1, column.length))}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
