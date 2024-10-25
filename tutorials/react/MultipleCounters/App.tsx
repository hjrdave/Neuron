import React, { Fragment } from "react";
import Counter from "./Counter";

const counterPageStyles: React.CSSProperties = {
  height: "75vh",
};
const h1Styles: React.CSSProperties = {
  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
};
const textStyles: React.CSSProperties = {
  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
};
const counterContainerStyles: React.CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
};
export default function App() {
  const counterIds = [
    crypto.randomUUID(),
    crypto.randomUUID(),
    crypto.randomUUID(),
    crypto.randomUUID(),
  ];
  return (
    <>
      <div style={counterPageStyles}>
        <h1 style={h1Styles}>Private Neuron Components</h1>
        <p style={textStyles}>
          This is a demo of components that use Private Neurons. Each component
          uses it's own independent Neuron instance.
        </p>
        <div style={counterContainerStyles}>
          {counterIds.map((counterId) => (
            <Fragment key={counterId}>
              <Counter id={counterId} />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
