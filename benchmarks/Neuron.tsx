import React, { Fragment, useEffect, useState } from "react";
import { createStore } from "@sandstack/neuron/react";
import { initialList, renderIntervals } from "./config";

interface State {
  list: string[];
  time: number;
}
const { useNeuron, State } = createStore<State>();

function Store() {
  return (
    <>
      <State name={"list"} state={[]} />
      <State name={"time"} state={0} />
    </>
  );
}

function BenchMarkComp() {
  const [, setList] = useNeuron("list");
  const [time] = useNeuron<number>("time");
  const [intervals, setIntervals] = useState<number[]>([]);
  const averageTime = parseFloat(
    (intervals.reduce((acc, val) => acc + val, 0) / intervals.length).toFixed(0)
  );
  const onClick = () => {
    for (let i = 0; i < renderIntervals; i++) {
      setList([...initialList]);
    }
  };
  useEffect(() => {
    if (time !== 0) {
      setIntervals((prev) => [...prev, time]);
    }
  }, [time]);

  return (
    <>
      <h1>Neuron Benchmarks: Big List</h1>
      <button onClick={onClick}>Start</button>
      <p>List Renders: {renderIntervals}</p>
      <p>Average Benchmark: {averageTime} ms</p>
    </>
  );
}

function ListComp() {
  const [list] = useNeuron<string[]>("list");
  const [, setTime] = useNeuron<number>("time");
  useEffect(() => {
    const d = new Date();
    const ms = d.getMilliseconds();
    setTime(ms);
  }, [list]);
  return (
    <>
      {list.map((item, index) => (
        <Fragment key={index}>
          <p>{item}</p>
        </Fragment>
      ))}
    </>
  );
}

export default function NeuronBenchMarks() {
  return (
    <>
      <Store />
      <BenchMarkComp />
      <ListComp />
    </>
  );
}
