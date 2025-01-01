import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import { NeuronClient } from "../NeuronClient";

describe("NeuronClient", () => {
  it("should create a NeuronClient instance with default options", () => {
    const client = new NeuronClient();
    expect(client.name).toBeUndefined();
    expect(client.client).toBeDefined();
    expect(client.neuron).toBeDefined();
    expect(client.useNeuron).toBeDefined();
  });

  it("should support creating neurons through the client", () => {
    const client = new NeuronClient();
    const useNeuron = client.neuron({ value: 0 }, { key: "testNeuronClient" });

    const { result } = renderHook(() => useNeuron());
    const [state] = result.current;

    expect(state).toEqual({ value: 0 });
  });

  it("should respect modules in NeuronClient options", () => {
    const mockOnDispatch = vi.fn();
    const mockModule = { name: "testModule", onDispatch: mockOnDispatch };

    const client = new NeuronClient({ modules: [mockModule] });
    const useNeuron = client.neuron({ value: 0 }, { key: "testNeuronClient" });

    const { result } = renderHook(() => useNeuron());
    const [, actions] = result.current;

    act(() => {
      actions.set({ value: 1 });
    });

    expect(mockOnDispatch).toHaveBeenCalled();
  });

  it("should allow state updates through the connect object", () => {
    const client = new NeuronClient();
    const useNeuron = client.neuron({ value: 0 }, { key: "testNeuronClient" });

    const { result } = renderHook(() => useNeuron());

    act(() => {
      client.client.dispatch("testNeuronClient", (payload) => {
        payload.state = { value: 42 };
      });
    });

    const [state] = result.current;
    expect(state).toEqual({ value: 42 });
  });

  it("should provide the correct state through getSnapshot in the connect object", () => {
    const client = new NeuronClient();
    client.neuron({ value: 0 }, { key: "testNeuronClient" });

    // Retrieve the snapshot for the specific neuron
    const snapshot = client.client.getSnapshot();

    // Ensure the snapshot correctly reflects the state
    expect(snapshot[0].state).toEqual({ value: 0 });
  });

  it("should support listening to state changes", () => {
    const client = new NeuronClient();
    const mockListener = vi.fn();

    client.neuron({ value: 0 }, { key: "testNeuronClient" });

    client.client.listen(mockListener);
    act(() => {
      client.client.dispatch("testNeuronClient", (payload) => {
        payload.state = { value: 42 };
      });
    });

    expect(mockListener).toHaveBeenCalledTimes(1);
  });

  it("should support selectors when creating neurons", () => {
    const client = new NeuronClient();
    const useNeuron = client.neuron(
      { value: 0, nested: { count: 10 } },
      { key: "testNeuronClient" }
    );

    const { result, rerender } = renderHook(() =>
      useNeuron((state) => state.nested.count)
    );

    // Initial state
    const [slice, actions] = result.current;
    expect(slice).toBe(10);

    // Update state slice
    act(() => {
      actions.setSlice((prevSlice) => prevSlice + 1);
    });

    rerender();

    const [updatedSlice] = result.current;
    expect(updatedSlice).toBe(11);
  });
});
