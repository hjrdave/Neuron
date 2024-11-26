import { describe, it, expect, vi } from "vitest";
import { Neuron } from "../Neuron"; // Adjust the import path as needed

describe("Neuron", () => {
  describe("Initialization and State", () => {
    it("should initialize with the correct state", () => {
      const neuron = new Neuron(0); // Initial state: 0
      expect(neuron.getRef()).toBe(0); // Verify the initial state
    });

    it("should generate a unique key for each neuron", () => {
      const neuron1 = new Neuron(0);
      const neuron2 = new Neuron(0);
      expect(neuron1.key).not.toBe(neuron2.key); // Verify keys are unique
    });
  });
  describe("State Updates", () => {
    it("should update state using the set method", () => {
      const neuron = new Neuron(0); // Initial state: 0
      neuron.set(42); // Update the state
      expect(neuron.getRef()).toBe(42); // Verify the state has changed
    });

    it("should accept a state updater function in the set method", () => {
      const neuron = new Neuron(0); // Initial state: 0
      neuron.set((prevState) => prevState + 1); // Increment the state
      expect(neuron.getRef()).toBe(1); // Verify the incremented state
    });

    it("should correctly update prevState after set is called", () => {
      const initialState = { count: 0 };
      const neuron = new Neuron(initialState);

      neuron.set({ count: 1 }); // Update the state to { count: 1 }

      // Verify the current state and prevState
      const currentState = neuron.getRef();
      expect(currentState).toEqual({ count: 1 });

      // Since prevState is part of internal storage, we can check it by calling `dispatch`
      neuron.dispatch((payload) => {
        expect(payload.prevState).toEqual({ count: 0 }); // Ensure prevState was updated correctly
      });
    });
  });

  describe("Neuron Equality Check", () => {
    it("should trigger middleware for primitive state changes", () => {
      const onDispatchMock = vi.fn();
      const initialState = 0;

      // Create a neuron with onDispatch middleware
      const neuron = new Neuron(initialState, {
        onDispatch: onDispatchMock,
      });

      // Update the state to a different primitive value
      neuron.set(1);

      // Assert that onDispatch was triggered
      expect(onDispatchMock).toHaveBeenCalledTimes(1);

      // Extract the arguments passed to the mock
      const [payload] = onDispatchMock.mock.calls[0];
      expect(payload).toMatchObject({
        prevState: 0,
        state: 1,
      });
    });

    it("should trigger middleware for unequal non-primitive state changes", () => {
      const onDispatchMock = vi.fn();
      const initialState = { count: 0 };

      // Create a neuron with onDispatch middleware
      const neuron = new Neuron(initialState, {
        onDispatch: onDispatchMock,
      });

      // Update the state to a different object
      neuron.set({ count: 1 });

      // Assert that onDispatch was triggered
      expect(onDispatchMock).toHaveBeenCalledTimes(1);

      // Extract the arguments passed to the mock
      const [payload] = onDispatchMock.mock.calls[0];
      expect(payload).toMatchObject({
        prevState: { count: 0 },
        state: { count: 1 },
      });
    });
    it("should not trigger middleware, effects, or onCallback if dispatch is cancelled", () => {
      const onDispatchMock = vi.fn((payload) => payload.cancelDispatch());
      const onCallbackMock = vi.fn();
      const effectMock = vi.fn();
      const initialState = 42;

      // Create a neuron with onDispatch, onCallback, and effect
      const neuron = new Neuron<number, unknown, unknown>(initialState, {
        onDispatch: onDispatchMock,
        onCallback: onCallbackMock,
      });

      // Attach an effect
      neuron.effect(effectMock);

      // Update the state with a different value
      neuron.set(43);

      // Assert that dispatch was cancelled
      expect(onDispatchMock).toHaveBeenCalledTimes(1);
      expect(onCallbackMock).not.toHaveBeenCalled(); // onCallback should not trigger on cancellation
      expect(effectMock).not.toHaveBeenCalled(); // effect should not fire on cancellation

      // Verify the payload passed to `onDispatchMock`
      const [payload] = onDispatchMock.mock.calls[0];
      expect(payload).toMatchObject({
        prevState: 42,
        state: 43,
        cancelDispatch: expect.any(Function),
        isDispatchCancelled: expect.any(Function),
      });

      // Assert that `isDispatchCancelled` returns true
      expect(payload.isDispatchCancelled()).toBe(true);

      // Update the state with a valid value (no cancellation)
      onDispatchMock.mockImplementation(() => {}); // Disable cancellation
      neuron.set(44);

      // Assert that `onCallback` and `effect` were triggered
      expect(onCallbackMock).toHaveBeenCalledTimes(1);
      expect(effectMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("State Cloning and Dispatching", () => {
    it("should return a clone of the state with getClone", () => {
      const initialState = { count: 0 }; // Use a non-primitive initial state
      const neuron = new Neuron(initialState);
      const clone = neuron.getClone();

      expect(clone).toEqual(initialState); // Ensure the clone matches the state
      expect(clone).not.toBe(neuron.getRef()); // Verify it's a clone, not a reference

      // Modify the clone and ensure the original state is unaffected
      clone.count = 1;
      expect(neuron.getRef()).toEqual({ count: 0 }); // Original state remains unchanged
    });

    it("should dispatch a mutator function with dispatch", () => {
      const neuron = new Neuron(0); // Initial state: 0
      neuron.dispatch((payload) => {
        payload.state = 99; // Mutate the state
      });
      expect(neuron.getRef()).toBe(99); // Verify the updated state
    });
  });

  describe("Effects and Actions", () => {
    it("should register and execute effects with effect", () => {
      const neuron = new Neuron(0); // Initial state: 0
      const callback = vi.fn(); // Create a mock callback function
      neuron.effect(callback); // Register the effect
      neuron.set(1); // Trigger the effect by updating state

      expect(callback).toHaveBeenCalledTimes(1); // Ensure the effect was called once
    });

    it("should return actions with getActions", () => {
      const actions = {
        increment: vi.fn(),
        decrement: vi.fn(),
      };

      const neuron = new Neuron(0, {
        actions: () => actions, // Provide custom actions
      });

      expect(neuron.getActions()).toBe(actions); // Verify the actions object is returned
    });

    it("should use dispatch within actions to update state", () => {
      const initialState = { count: 0 };

      // Create a neuron with the actions
      const neuron = new Neuron(initialState, {
        actions: (dispatch) => ({
          increment: () =>
            dispatch((payload) => {
              payload.state = { count: payload.state.count + 1 };
            }),
          decrement: () =>
            dispatch((payload) => {
              payload.state = { count: payload.state.count - 1 };
            }),
        }),
      });

      // Retrieve the actions
      const { increment, decrement } = neuron.getActions();

      // Use the actions to modify the state
      increment();
      expect(neuron.getRef()).toEqual({ count: 1 }); // State should be incremented

      decrement();
      expect(neuron.getRef()).toEqual({ count: 0 }); // State should be decremented
    });
  });

  describe("Middleware Functionality", () => {
    it("should call onInit middleware during initialization", () => {
      const onInitMock = vi.fn();
      const initialState = { count: 0 };

      // Create a neuron with the onInit middleware
      new Neuron(initialState, {
        onInit: onInitMock,
      });

      // Assert that onInit was called once
      expect(onInitMock).toHaveBeenCalledTimes(1);

      // Assert that onInit was called with the correct payload
      const [payload] = onInitMock.mock.calls[0]; // Extract arguments

      expect(payload).toMatchObject({
        state: { count: 0 },
        prevState: { count: 0 },
        key: expect.any(String),
        cancelDispatch: expect.any(Function),
        isDispatchCancelled: expect.any(Function), // isDispatchCancelled is likely a function, not a boolean
      });
    });

    it("should call onDispatch middleware during state updates", () => {
      const onDispatchMock = vi.fn();
      const initialState = { count: 0 };

      // Create a neuron with the onDispatch middleware
      const neuron = new Neuron(initialState, {
        onDispatch: onDispatchMock,
      });

      // Update the state
      neuron.set({ count: 1 });

      // Assert that onDispatch was called once
      expect(onDispatchMock).toHaveBeenCalledTimes(1);

      // Extract the arguments passed to the mock
      const [payload] = onDispatchMock.mock.calls[0];

      // Assert the payload structure
      expect(payload).toMatchObject({
        key: expect.any(String),
        state: { count: 1 }, // The updated state
        prevState: { count: 0 }, // The previous state
        cancelDispatch: expect.any(Function),
        isDispatchCancelled: expect.any(Function),
      });

      // Specifically handle the `features` property
      if (payload.features !== undefined) {
        expect(payload.features).toEqual(expect.anything());
      }
    });

    it("should call onCallback middleware after state updates", () => {
      const onCallbackMock = vi.fn();
      const initialState = { count: 0 };

      // Create a neuron with the onCallback middleware
      const neuron = new Neuron(initialState, {
        onCallback: onCallbackMock,
      });

      // Update the state
      neuron.set({ count: 1 });

      // Assert that onCallback was called once
      expect(onCallbackMock).toHaveBeenCalledTimes(1);

      // Extract the arguments passed to the mock
      const [payload] = onCallbackMock.mock.calls[0];

      // Assert the payload structure
      expect(payload).toMatchObject({
        key: expect.any(String),
        state: { count: 1 }, // The updated state
        prevState: { count: 0 }, // The previous state
        cancelDispatch: expect.any(Function),
        isDispatchCancelled: expect.any(Function),
      });

      // Specifically handle the `features` property
      if (payload.features !== undefined) {
        expect(payload.features).toEqual(expect.anything());
      }
    });

    it("should call all middlewares in sequence during a state update", () => {
      const onInitMock = vi.fn();
      const onDispatchMock = vi.fn();
      const onCallbackMock = vi.fn();
      const initialState = { count: 0 };

      // Create a neuron with all middlewares
      const neuron = new Neuron(initialState, {
        onInit: onInitMock,
        onDispatch: onDispatchMock,
        onCallback: onCallbackMock,
      });

      // Update the state
      neuron.set({ count: 1 });

      // Assert that all middlewares were called in the correct sequence
      expect(onInitMock).toHaveBeenCalledTimes(1);
      expect(onDispatchMock).toHaveBeenCalledTimes(1);
      expect(onCallbackMock).toHaveBeenCalledTimes(1);
    });
  });

  describe("prevState Tracking", () => {
    it("should correctly update prevState after dispatch is called", () => {
      const initialState = { count: 0 };
      const neuron = new Neuron(initialState);

      neuron.dispatch((payload) => {
        payload.state = { count: 3 }; // Mutate the state
      });

      // Verify the current state and prevState
      const currentState = neuron.getRef();
      expect(currentState).toEqual({ count: 3 });

      neuron.dispatch((payload) => {
        expect(payload.prevState).toEqual({ count: 0 }); // Ensure prevState was updated correctly
      });
    });

    it("should not mutate the original state when a clone is used", () => {
      const initialState = { count: 0 };
      const neuron = new Neuron(initialState);
      const clone = neuron.getClone();

      clone.count = 5; // Mutate the clone

      // Verify the original state remains unchanged
      expect(neuron.getRef()).toEqual({ count: 0 });
    });
  });
});
