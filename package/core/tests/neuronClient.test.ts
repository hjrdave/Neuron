import { describe, it, expect } from "vitest";
import { NeuronClient } from "../NeuronClient";

describe("NeuronClient", () => {
  it("should initialize with a name", () => {
    const client = new NeuronClient({ name: "TestClient" });

    expect(client.name).toBe("TestClient");
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
