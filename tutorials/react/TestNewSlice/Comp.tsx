import React from "react";
import { neuron } from "../../../package/react_new";

const usePerson = neuron({ name: "bob", age: 10 });

const h1Styles: React.CSSProperties = {
  fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
};

export default function App() {
  ///multiple instances of the same neuron hook with a slice causes the effect to not work
  const [name, { setSlice: setName }] = usePerson((person) => person.name);
  const [age, { setSlice: setAge }] = usePerson((person) => person.age);
  const [person, actions] = usePerson();
  return (
    <>
      <button onClick={() => setAge((prev) => prev + 1)}>Increment Age</button>
      <button onClick={() => setName((prev) => prev + "foo")}>
        Change Name
      </button>
      <button onClick={() => actions.set({ name: "bill", age: 100 })}>
        update peson
      </button>
      <div style={{ height: "75vh" }}>
        <h1 style={h1Styles}>Neuron Component</h1>
        <p>name: {name}</p>
        <p>age: {age}</p>
        <code style={{ color: "white" }}>{JSON.stringify(person)}</code>
      </div>
    </>
  );
}
