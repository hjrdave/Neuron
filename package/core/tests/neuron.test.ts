import { describe, it, expect, vi } from "vitest";
import { Neuron } from "../Neuron"; // Adjust the import path as needed

describe("Neuron", () => {
  it("should initialize with the correct state", () => {
    const neuron = new Neuron(0); // Initial state: 0
    expect(neuron.getRef()).toBe(0); // Verify the initial state
  });

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

  it("should return a clone of the state with getClone", () => {
    const neuron = new Neuron(100); // Initial state: 100
    const clone = neuron.getClone();

    expect(clone).toBe(100); // Ensure the clone matches the state
    expect(clone).not.toBe(neuron.getRef()); // Verify it's a clone, not a reference
  });

  it("should dispatch a mutator function with dispatch", () => {
    const neuron = new Neuron(0); // Initial state: 0
    neuron.dispatch((payload) => {
      payload.state = 99; // Mutate the state
    });
    expect(neuron.getRef()).toBe(99); // Verify the updated state
  });

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

  it("should generate a unique key for each neuron", () => {
    const neuron1 = new Neuron(0);
    const neuron2 = new Neuron(0);

    expect(neuron1.key).not.toBe(neuron2.key); // Verify keys are unique
  });
});
