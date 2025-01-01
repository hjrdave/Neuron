import React, { Fragment } from "react";
//import { PrivateNeuronClient } from "../../../package/react";
import { PrivateNeuronClient } from "@sandstack/neuron/react";

const { privateNeuron, useNeuronClient } = new PrivateNeuronClient();

//private neurons are default
const [useInitCount, useCount] = privateNeuron(0, {
  actions: (dispatch) => ({
    increment: () =>
      dispatch((payload) => {
        payload.state = payload.prevState + 1;
      }),
    decrement: () =>
      dispatch((payload) => {
        payload.state = payload.prevState - 1;
      }),
  }),
});

const containerStyles: React.CSSProperties = {
  display: "flex",
  justifyContent: "start",
  alignItems: "start",
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
  textAlign: "center",
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
function PrivateNeuronCounterComp() {
  const [count, countActions] = useCount();
  return (
    <>
      <div style={containerStyles}>
        <div style={counterStyles}>
          <h1 style={h1Styles}>Counter</h1>
          <p style={countStyles}>Count: {count}</p>
          <div style={btnGroupStyles}>
            <button style={btnStyles} onClick={countActions.decrement}>
              Decrement
            </button>
            <button style={btnStyles} onClick={countActions.increment}>
              Increment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
function PrivateNeuronCounter(props: { id: string }) {
  const { Private, client } = useNeuronClient({ name: props.id });
  useInitCount(client);
  return (
    <>
      <Private>
        <PrivateNeuronCounterComp />
      </Private>
    </>
  );
}

const h1AppStyles: React.CSSProperties = {
  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
};
const textAppStyles: React.CSSProperties = {
  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
};
export default function PrivateNeuronCounterApp() {
  const counterIds = [
    crypto.randomUUID(),
    crypto.randomUUID(),
    crypto.randomUUID(),
    crypto.randomUUID(),
  ];
  return (
    <>
      <div style={{ height: "75vh" }}>
        <h1 style={h1AppStyles}>Private Neuron Components</h1>
        <p style={textAppStyles}>
          This is a demo of a component that uses multiple private Neuron
          components.
        </p>
        <div style={{ display: "flex", gap: "1rem" }}>
          {counterIds.map((id) => (
            <Fragment key={id}>
              <PrivateNeuronCounter id={id} />
            </Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
