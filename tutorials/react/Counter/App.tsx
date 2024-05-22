import React from "react";
import Counter from "./Counter";
import Store from "./Store";

export default function App() {
  return (
    <>
      <Store />
      <div style={{ height: "75vh" }}>
        <Counter />
      </div>
    </>
  );
}
