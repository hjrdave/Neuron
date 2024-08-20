import { NeuronClient } from "../NeuronClient";
import { it, expect, describe } from "vitest";
import { renderHook } from "@testing-library/react-hooks";

const { neuron } = new NeuronClient();

const useCount = neuron(0, {
  actions: (dispatch) => ({
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
  }),
});

describe("Test state actions", () => {
  it("Check basic actions", () => {
    const _count = renderHook(() => useCount());
    const countActions = _count.result.all[0][1];
    expect(_count.result.current[0]).toBe(0);
    countActions.increment();
    countActions.increment();
    expect(_count.result.current[0]).toBe(2);
    countActions.decrement();
    expect(_count.result.current[0]).toBe(1);
  });
});
