import { describe, it, expect } from "vitest";
import { NeuronClient } from "../NeuronClient";

describe("NeuronClient", () => {
  it("should initialize with a name", () => {
    const client = new NeuronClient({ name: "TestClient" });
    expect(client.name).toBe("TestClient");
  });

  describe("Neuron State Management", () => {
    it("should create and manage a neuron using the neuron method", () => {
      const client = new NeuronClient();

      const neuron = client.neuron("initialState");

      // Verify the neuron is created with the correct initial state
      expect(neuron.getRef()).toBe("initialState");

      // Verify the neuron key is registered in the client
      expect(client.has(neuron.key)).toBe(true);
    });

    it("should return a reference to state with getRef", () => {
      const client = new NeuronClient();

      const neuron = client.neuron("initialState");
      expect(client.getRef(neuron.key)).toBe("initialState");
    });

    it("should track whether state exists with has", () => {
      const client = new NeuronClient();

      const neuron = client.neuron("initialState");
      expect(client.has(neuron.key)).toBe(true);
      expect(client.has("nonexistentKey")).toBe(false);
    });

    it("should dispatch state changes correctly", () => {
      const client = new NeuronClient();

      const neuron = client.neuron("initialState");
      client.dispatch(neuron.key, (payload) => {
        payload.state = "newState";
      });

      expect(neuron.getRef()).toBe("newState");
    });
  });
  describe("NeuronClient - Remove Neurons", () => {
    it("should remove a neuron correctly", () => {
      const client = new NeuronClient();

      // Create a neuron
      client.neuron("initialState", { key: "neuronToRemove" });

      // Verify the neuron is created
      expect(client.has("neuronToRemove")).toBe(true);
      expect(client.getRef("neuronToRemove")).toBe("initialState");

      // Remove the neuron
      client.remove("neuronToRemove");

      // Verify the neuron is removed
      expect(client.has("neuronToRemove")).toBe(false);
      expect(client.getRef("neuronToRemove")).toBeUndefined();
    });

    it("should handle removing a non-existent neuron gracefully", () => {
      const client = new NeuronClient();

      // Attempt to remove a non-existent neuron
      expect(() => client.remove("nonExistentKey")).not.toThrow();
      expect(client.has("nonExistentKey")).toBe(false);
    });

    it("should not affect other neurons when one is removed", () => {
      const client = new NeuronClient();

      // Create two neurons
      client.neuron("stateA", { key: "neuronA" });
      client.neuron("stateB", { key: "neuronB" });

      // Verify both neurons are created
      expect(client.has("neuronA")).toBe(true);
      expect(client.has("neuronB")).toBe(true);

      // Remove one neuron
      client.remove("neuronA");

      // Verify neuronA is removed
      expect(client.has("neuronA")).toBe(false);
      expect(client.getRef("neuronA")).toBeUndefined();

      // Verify neuronB still exists
      expect(client.has("neuronB")).toBe(true);
      expect(client.getRef("neuronB")).toBe("stateB");
    });
  });
  describe("NeuronClient - getActions", () => {
    it("should return an empty object if no actions are defined", () => {
      // Create a new instance of NeuronClient for this test
      const client = new NeuronClient();
      const neuron = client.neuron("initialState");

      const actions = client.getActions(neuron.key);
      expect(actions).toEqual({});
    });

    it("should return the defined actions for a neuron", () => {
      // Create a new instance of NeuronClient for this test
      const client = new NeuronClient();
      const neuron = client.neuron("initialState", {
        actions: (dispatch) => ({
          increment: () =>
            dispatch((payload) => (payload.state = "incremented")),
          decrement: () =>
            dispatch((payload) => (payload.state = "decremented")),
        }),
      });

      const actions = client.getActions<{
        increment: () => void;
        decrement: () => void;
      }>(neuron.key);
      expect(actions).toHaveProperty("increment");
      expect(actions).toHaveProperty("decrement");

      // Verify that the actions work as expected
      actions.increment();
      expect(client.getRef(neuron.key)).toBe("incremented");

      actions.decrement();
      expect(client.getRef(neuron.key)).toBe("decremented");
    });

    it("should throw an error if getActions is called for a non-existent neuron key", () => {
      // Create a new instance of NeuronClient for this test
      const client = new NeuronClient();

      const invalidKey = "nonExistentKey";
      expect(client.getActions(invalidKey)).toEqual({});
    });

    it("should bind dispatch correctly to actions", () => {
      // Create a new instance of NeuronClient for this test
      const client = new NeuronClient();
      const neuron = client.neuron("initialState", {
        actions: (dispatch) => ({
          setState: (newState: string) =>
            dispatch((payload) => (payload.state = newState)),
        }),
      });

      const actions = client.getActions<{
        setState: (newState: string) => void;
      }>(neuron.key);

      // Verify that dispatch is bound correctly
      actions.setState("newState");
      expect(client.getRef(neuron.key)).toBe("newState");
    });

    it("should work with complex action dispatches", () => {
      // Create a new instance of NeuronClient for this test
      const client = new NeuronClient();
      const neuron = client.neuron(
        { count: 0 },
        {
          actions: (dispatch) => ({
            increment: () =>
              dispatch(
                (payload) =>
                  (payload.state = { count: payload.state.count + 1 })
              ),
            reset: () => dispatch((payload) => (payload.state = { count: 0 })),
          }),
        }
      );

      const actions = client.getActions<{
        increment: () => void;
        reset: () => void;
      }>(neuron.key);

      // Verify increment action
      actions.increment();
      expect(client.getRef(neuron.key)).toEqual({ count: 1 });

      actions.increment();
      expect(client.getRef(neuron.key)).toEqual({ count: 2 });

      // Verify reset action
      actions.reset();
      expect(client.getRef(neuron.key)).toEqual({ count: 0 });
    });
  });

  describe("Neuron Interactions", () => {
    it("should allow one neuron to update another neuron during onInit", () => {
      const client = new NeuronClient();

      // Create neuron B with an initial state
      const neuronB = client.neuron("stateB", { key: "neuronB" });

      // Create neuron A with onInit callback
      client.neuron("stateA", {
        onInit: () => {
          // Update neuron B during neuron A's initialization
          client.dispatch("neuronB", (payload) => {
            payload.state = "updatedByNeuronA";
          });
        },
      });
      // Ensure neuron A's onInit logic has updated neuron B's state
      expect(client.getRef(neuronB.key)).toBe("updatedByNeuronA");
    });

    it("should allow one neuron to update another neuron during onDispatch", () => {
      const client = new NeuronClient();

      // Create neuron A
      const neuronA = client.neuron("stateA", {
        onDispatch: () => {
          // Update neuronB when neuronA dispatches
          client.dispatch("neuronB", (payload) => {
            payload.state = "updatedByNeuronA";
          });
        },
      });

      // Create neuron B
      const neuronB = client.neuron("stateB", { key: "neuronB" });

      // Dispatch an update to neuron A
      client.dispatch(neuronA.key, (payload) => {
        payload.state = "newStateA";
      });

      // Ensure neuron B's state is updated by neuron A
      expect(client.getRef(neuronB.key)).toBe("updatedByNeuronA");
    });

    it("should allow one neuron to update another neuron during onCallback", () => {
      const client = new NeuronClient();

      // Create neuron A
      const neuronA = client.neuron("stateA", {
        onCallback: () => {
          // Update neuronB during neuronA's callback
          client.dispatch("neuronB", (payload) => {
            payload.state = "updatedByNeuronA";
          });
        },
      });

      // Create neuron B
      const neuronB = client.neuron("stateB", { key: "neuronB" });

      // Update neuron A's state to trigger its onCallback middleware
      neuronA.set("newStateA");

      // Ensure neuron B's state is updated by neuron A
      expect(client.getRef(neuronB.key)).toBe("updatedByNeuronA");
    });

    /**THERE IS AN ISSUE WITH CHAINING */
    it("should allow chaining updates between neurons", async () => {
      const client = new NeuronClient();

      // Create neuron A with an onCallback to update neuron B
      const neuronA = client.neuron("stateA", {
        key: "neuronA",
        onCallback: () => {
          client.dispatch("neuronB", (payload) => {
            payload.state = "updatedByNeuronA";
          });
        },
      });

      // Create neuron B with an onCallback to update neuron C
      const neuronB = client.neuron("stateB", {
        key: "neuronB",
        onCallback: () => {
          client.dispatch("neuronC", (payload) => {
            payload.state = "updatedByNeuronB";
          });
        },
      });

      // Create neuron C (this will be updated by neuron B)
      const neuronC = client.neuron("stateC", {
        key: "neuronC",
      });

      // Update neuron A's state to trigger the chain reaction
      neuronA.set("newState");

      // Assert that neuron B was updated by neuron A
      expect(client.getRef(neuronB.key)).toBe("updatedByNeuronA");

      // Assert that neuron C was updated by neuron B
      expect(client.getRef(neuronC.key)).toBe("updatedByNeuronB");
    });
  });
});
