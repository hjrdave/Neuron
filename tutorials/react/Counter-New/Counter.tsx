import React, { useEffect } from "react";
import { useCount, useFruit, usePerson } from "./Store";

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
  const [count, countActions] = useCount();
  const [fruit, fruitActions] = useFruit();
  const [person, personActions] = usePerson();
  const [name, { setSlice: setName }] = usePerson((state) => state.name);
  const [age, { setSlice: setAge }] = usePerson((state) => state.age);

  return (
    <>
      <p>age: {age}</p>
      <p>name: {name}</p>
      <button onClick={() => setAge((prev) => prev + 1)}>Update age</button>
      <button onClick={() => setName((prev) => prev + prev)}>
        Update name
      </button>
      <button
        onClick={() =>
          personActions.set({ name: "Kevin", age: 100, job: "foo" })
        }
      >
        Update Person
      </button>
      <div style={containerStyles}>
        <div style={counterStyles}>
          <h1 style={h1Styles}>Neuron React: New</h1>
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
