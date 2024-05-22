import React, { useState } from "react";
import Grid from "./Grid";

export default function App() {
  const [columns, setColumns] = useState<string[]>([]);
  const [data, setData] = useState([]);
  const getData = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const data = await response.json();
    setColumns(Object.entries(data[0]).map((item) => item[0]));
    setData(data);
  };
  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div style={{ height: "75vh" }}>
        <Grid columns={columns} data={data} />
        <Grid columns={columns} data={data} />
      </div>
    </>
  );
}
