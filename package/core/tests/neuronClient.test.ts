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

      // Create neuron B
      const neuronB = client.neuron("stateB", { key: "neuronB" });

      // Ensure neuron B's state is updated by neuron A
      expect(client.getRef(neuronB.key)).toBe("updatedByNeuronA");
    });

    it("should allow one neuron to update another neuron during onDispatch", () => {
      const client = new NeuronClient();

      // Create neuron A
      const neuronA = client.neuron("stateA", {
        onDispatch: (payload, clientStore) => {
          // Update neuronB when neuronA dispatches
          const neuronB = clientStore.get("neuronB");
          if (neuronB) {
            neuronB.state = "updatedByNeuronA";
          }
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
        onCallback: (payload, clientStore) => {
          // Update neuronB during neuronA's callback
          const neuronB = clientStore.get("neuronB");
          if (neuronB) {
            neuronB.state = "updatedByNeuronA";
          }
        },
      });

      // Create neuron B
      const neuronB = client.neuron("stateB", { key: "neuronB" });

      // Update neuron A's state to trigger its onCallback middleware
      neuronA.set("newStateA");

      // Ensure neuron B's state is updated by neuron A
      expect(client.getRef(neuronB.key)).toBe("updatedByNeuronA");
    });

    it("should allow chaining updates between neurons", () => {
      const client = new NeuronClient();

      // Create neuron A
      const neuronA = client.neuron("stateA", {
        onCallback: (payload, clientStore) => {
          // Update neuron B when neuron A's callback is triggered
          const neuronB = clientStore.get("neuronB");
          if (neuronB) {
            neuronB.state = "updatedByNeuronA";
          }
        },
      });

      // Create neuron B
      const neuronB = client.neuron("stateB", {
        onCallback: (payload, clientStore) => {
          // Update neuron C when neuron B's callback is triggered
          const neuronC = clientStore.get("neuronC");
          if (neuronC) {
            neuronC.state = "updatedByNeuronB";
          }
        },
        key: "neuronB",
      });

      // Create neuron C
      const neuronC = client.neuron("stateC", { key: "neuronC" });

      // Update neuron A's state to trigger the chain reaction
      neuronA.set("newStateA");

      // Ensure neuron B is updated by neuron A
      expect(client.getRef(neuronB.key)).toBe("updatedByNeuronA");

      // Ensure neuron C is updated by neuron B
      expect(client.getRef(neuronC.key)).toBe("updatedByNeuronB");
    });
  });
});
