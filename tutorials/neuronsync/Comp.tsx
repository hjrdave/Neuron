import React, { useEffect } from "react";
import { NeuronSync } from "../../package/sync";

const getTodo = new NeuronSync<Todo | null>({ fallback: null }).query<{
  id: number;
}>(async (params) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${params?.id}`
  );
  const _todo = await response.json();
  return _todo;
});

export default function App() {
  const { watch, sync } = getTodo.query({ id: 2 });
  useEffect(() => {
    watch((syncState) => {
      console.log("syncState", syncState);
    });
  }, []);
  return (
    <>
      <p>Neuron Sync</p>
      <button onClick={() => sync()}>Click</button>
    </>
  );
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
