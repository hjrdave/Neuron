import React from "react";
import { useColumns, useFilteredData, useSearchParams } from "./Grid.store";

export default function Search() {
  const [columns] = useColumns();
  const [, , { queryData }] = useFilteredData();
  const [input, { setSlice: setInput }] = useSearchParams(
    (state) => state.input
  );
  const [targetColumn, { setSlice: setTargetColumn }] = useSearchParams(
    (state) => state.targetColumn
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
