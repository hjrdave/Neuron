import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react-hooks";
import { neuron } from "../neuron";
import { IModule } from "../../core/Module";

describe("neuron", () => {
  it("should create a Neuron instance and return the initial state", () => {
    const mockModule: IModule = {
      name: "testModule",
      onDispatch: vi.fn(),
    };

    const useNeuron = neuron(
      { value: 0 },
      { key: "testNeuron", modules: [mockModule] }
    );

    const { result } = renderHook(() => useNeuron());
    const [state] = result.current;

    expect(state).toEqual({ value: 0 });
  });

  it("should update state with the set action", () => {
    const useNeuron = neuron({ value: 0 });

    const { result } = renderHook(() => useNeuron());
    const [, actions] = result.current;

    act(() => {
      actions.set({ value: 42 });
    });

    const [updatedState] = result.current;
    expect(updatedState).toEqual({ value: 42 });
  });

  it("should support state slicing with a selector", () => {
    const useNeuron = neuron({ value: 0, nested: { count: 10 } });

    // Render the hook with the selector
    const { result } = renderHook(() =>
      useNeuron((state) => state.nested.count)
    );

    // Initial state
    expect(result.current[0]).toBe(10); // `slice` is the first item returned

    // Update the state slice
    act(() => {
      result.current[1].setSlice((prevSlice) => prevSlice + 1); // `actions.setSlice`
    });

    // Verify the updated slice
    expect(result.current[0]).toBe(11); // Updated `slice` value
  });

  it("should apply modules correctly during state updates", () => {
    const mockOnDispatch = vi.fn();
    const mockModule: IModule = {
      name: "testModule",
      onDispatch: mockOnDispatch,
    };

    const useNeuron = neuron(
      { value: 0 },
      { key: "testNeuron", modules: [mockModule] }
    );

    const { result } = renderHook(() => useNeuron());
    const [, actions] = result.current;

    act(() => {
      actions.set({ value: 1 });
    });

    expect(mockOnDispatch).toHaveBeenCalled();
  });

  it("should return actions even without a state slice", () => {
    const useNeuron = neuron({ value: 0 });

    const { result } = renderHook(() => useNeuron());
    const [, actions] = result.current;

    expect(actions.set).toBeDefined();
  });
});
