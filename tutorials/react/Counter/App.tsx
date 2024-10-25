import React from "react";
import Counter from "./Counter";

const h1Styles: React.CSSProperties = {
  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
};
const textStyles: React.CSSProperties = {
  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
};
export default function App() {
  return (
    <>
      <div style={{ height: "75vh" }}>
        <h1 style={h1Styles}>Neuron Component</h1>
        <p style={textStyles}>
          This is a demo of a component that uses Global Neurons.
        </p>
        <Counter />
      </div>
    </>
  );
}
