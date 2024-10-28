import React from "react";
import Provider, { useCount } from "./Counter.neurons";

const counterStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid black",
  padding: "2rem",
  margin: "1rem",
  borderRadius: "0.5rem",
  backgroundColor: "#57c09b",
};
const h1Styles: React.CSSProperties = {
  textAlign: "center",
  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  marginBottom: "0rem",
};
const countStyles: React.CSSProperties = {
  fontSize: "1.5rem",
  color: "black",
  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
  textAlign: "center",
};
const btnGroupStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: "1rem",
};
const btnStyles: React.CSSProperties = {
  padding: "0.5rem 1rem",
  fontSize: "1rem",
  border: "none",
  borderRadius: "0.5rem",
  backgroundColor: "#219ebc",
  cursor: "pointer",
};

function CounterComp() {
  const [count, countActions] = useCount();

  return (
    <>
      <div style={counterStyles}>
        <h1 style={h1Styles}>Counter</h1>
        <p style={countStyles}>{count}</p>
        <div style={btnGroupStyles}>
          <button style={btnStyles} onClick={countActions.decrement}>
            Decrement
          </button>
          <button style={btnStyles} onClick={countActions.increment}>
            Increment
          </button>
        </div>
      </div>
    </>
  );
}
export default function Counter({ id }: { id: string }) {
  return (
    <>
      <Provider id={id}>
        <CounterComp />
      </Provider>
    </>
  );
}
