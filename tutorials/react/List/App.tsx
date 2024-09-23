import React, { useEffect, useState } from "react";
import List from "./List";
import { ListData } from "./List/List.neurons";

export default function App() {
  const [listData, setListData] = useState<ListData[]>([]);
  const [listData2, setListData2] = useState<ListData[]>([]);
  const getData = async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const data = await response.json();
    setListData(data.splice(0, 5));
    setListData2(data.splice(0, 5));
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div style={{ height: "75vh", marginTop: "2rem", marginBottom: "2rem" }}>
        <List name={"List 1"} data={listData} />
        <List name={"List 2"} data={listData2} />
      </div>
    </>
  );
}
