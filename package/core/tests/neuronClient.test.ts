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
