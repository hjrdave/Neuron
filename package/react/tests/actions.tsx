import { createStore } from "../index";
import { it, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

interface State {
  count: number;
}
enum StateKeys {
  Count = "count",
}
const { useNeuron, State } = createStore<State>();

function Store() {
  return (
    <>
      <State
        name={"count"}
        state={0}
        actions={(dispatch) => ({
          increment: () => {
            dispatch((payload) => {
              payload.state = payload.prevState + 1;
            });
          },
          decrement: () => {
            dispatch((payload) => {
              payload.state = payload.prevState - 1;
            });
          },
        })}
      />
    </>
  );
}

describe("Test state actions", () => {
  it("Initialize Store", () => {
    render(<Store />);
  });
  it("Check basic actions", () => {
    const _count = renderHook(() => useNeuron(StateKeys.Count));
    const countActions = _count.result.all[0][2];
    expect(_count.result.current[0]).toBe(0);
    countActions.increment();
    countActions.increment();
    expect(_count.result.current[0]).toBe(2);
    countActions.decrement();
    expect(_count.result.current[0]).toBe(1);
  });
});
