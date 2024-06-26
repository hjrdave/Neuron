import React from "react";
import { useNeuron } from "./Store";

const containerStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
};
const counterStyles: React.CSSProperties = {
  display: "flex",
  flexDirection: "column",
  border: "1px solid black",
  padding: "2rem",
  borderRadius: "0.5rem",
  backgroundColor: "#57c09b",
};
const h1Styles: React.CSSProperties = {
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
export default function Counter() {
  const [counter, setCounter] = useNeuron<number>("counter");
  return (
    <>
      <div style={containerStyles}>
        <div style={counterStyles}>
          <h1 style={h1Styles}>Neuron React</h1>
          <p style={countStyles}>
            Count: <span id="count">{counter}</span>
          </p>
          <div style={btnGroupStyles}>
            <button
              style={btnStyles}
              onClick={() => setCounter((prev) => prev - 1)}
            >
              Decrement
            </button>
            <button
              style={btnStyles}
              onClick={() => setCounter((prev) => prev + 1)}
            >
              Increment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
