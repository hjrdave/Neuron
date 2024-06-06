import React, { Fragment, useEffect, useState } from "react";
import { create } from "zustand";
import { initialList, renderIntervals } from "./config";

interface ZustandStore {
  list: string[];
  time: number;
  setList: (list: string[]) => void;
  setTime: (time: number) => void;
}
const useZustandStore = create<ZustandStore>()((set) => ({
  list: [],
  time: 0,
  setList: (list: string[]) => {
    set({ list: list });
  },
  setTime: (time: number) => {
    set({ time: time });
  },
}));

function BenchMarkComp() {
  const setList = useZustandStore((state) => state.setList);
  const time = useZustandStore((state) => state.time);
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
      <h1>Zustand Benchmarks: Big List</h1>
      <button onClick={onClick}>Start</button>
      <p>List Renders: {renderIntervals}</p>
      <p>Average Benchmark: {averageTime} ms</p>
    </>
  );
}

function ListComp() {
  const setTime = useZustandStore((state) => state.setTime);
  const list = useZustandStore((state) => state.list);
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

export default function ZustandBenchMarks() {
  return (
    <>
      <BenchMarkComp />
      <ListComp />
    </>
  );
}
