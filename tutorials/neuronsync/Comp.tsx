import React, { useEffect, useState } from "react";
import { NeuronSync } from "../../package/sync";

const getTodo = new NeuronSync<Todo | null>().query<{
  id: number;
}>(async (params) => {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${params?.id}`
  );
  const _todo = (await response.json()) as Todo;
  return _todo;
});

export default function App() {
  //const todo = await getTodo.queryAsync({id: 2});
  // const todoAsync = async () => {
  //   const todo = await getTodo.queryAsync({ id: 2 });
  //   console.log(todo);
  // };

  const [id, setId] = useState(1);
  const { watch, sync } = getTodo.query([id], { id: id });
  useEffect(() => {
    watch((syncState) => {
      console.log("syncState", syncState);
    });
  }, []);
  return (
    <>
      <p>Neuron Sync</p>
      <button
        onClick={() => {
          setId((prev) => prev + 1);
          sync();
          // foo();
        }}
      >
        Click
      </button>
    </>
  );
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}
