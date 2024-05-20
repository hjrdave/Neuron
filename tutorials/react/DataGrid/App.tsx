import React from "react";
import Grid from "./Grid";
import { users } from "./data";

export default function App() {
  const columns = [
    "id",
    "name",
    "email",
    "age",
    "street",
    "city",
    "state",
    "zipCode",
  ];
  return (
    <>
      <div style={{ height: "75vh" }}>
        <Grid columns={columns} data={users} />
      </div>
    </>
  );
}
