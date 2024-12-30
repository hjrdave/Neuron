import { Neuron } from "../core/Neuron";
import { NeuronClient } from "../core";
import { Shallow, shallowEqual } from "./Shallow";
import { describe, it, expect } from "vitest";

describe("Shallow Module", () => {
  describe("With Neuron Class", () => {
    it("should allow state update if shallow equality fails (primitive types)", () => {
      const neuron = new Neuron(
        { value: 0 },
        { key: "testNeuron", modules: [Shallow()] }
      );

      neuron.set({ value: 1 });
      expect(neuron.getRef()).toEqual({ value: 1 });
    });

    it("should cancel state update if shallow equality succeeds (primitive types)", () => {
      const neuron = new Neuron(
        { value: 0 },
        { key: "testNeuron", modules: [Shallow()] }
      );

      neuron.set({ value: 0 });
      expect(neuron.getRef()).toEqual({ value: 0 });
    });

    it("should allow state update for non-primitive types with different references", () => {
      const neuron = new Neuron(
        { array: [1, 2, 3] },
        { key: "testNeuron", modules: [Shallow()] }
      );

      neuron.set({ array: [1, 2, 3] }); // New array reference
      expect(neuron.getRef()).toEqual({ array: [1, 2, 3] });
    });

    it("should cancel state update if non-primitive types have identical references", () => {
      const sharedArray = [1, 2, 3];
      const neuron = new Neuron(
        { array: sharedArray },
        { key: "testNeuron", modules: [Shallow()] }
      );

      neuron.set({ array: sharedArray });
      expect(neuron.getRef()).toEqual({ array: sharedArray });
    });
  });

  describe("With NeuronClient Class", () => {
    it("should allow state update if shallow equality fails (primitive types)", () => {
      const neuronClient = new NeuronClient({
        modules: [Shallow()],
      });
      const neuron = neuronClient.neuron(
        { value: 0 },
        { key: "testNeuronClient" }
      );

      neuron.set({ value: 1 });
      expect(neuron.getRef()).toEqual({ value: 1 });
    });

    it("should cancel state update if shallow equality succeeds (primitive types)", () => {
      const neuronClient = new NeuronClient({
        modules: [Shallow()],
      });
      const neuron = neuronClient.neuron(
        { value: 0 },
        { key: "testNeuronClient" }
      );

      neuron.set({ value: 0 });
      expect(neuron.getRef()).toEqual({ value: 0 });
    });

    it("should allow state update for non-primitive types with different references", () => {
      const neuronClient = new NeuronClient({
        modules: [Shallow()],
      });
      const neuron = neuronClient.neuron(
        { obj: { nested: 1 } },
        { key: "testNeuronClient" }
      );

      neuron.set({ obj: { nested: 1 } }); // New object reference
      expect(neuron.getRef()).toEqual({ obj: { nested: 1 } });
    });

    it("should cancel state update if non-primitive types have identical references", () => {
      const sharedObject = { nested: 1 };
      const neuronClient = new NeuronClient({
        modules: [Shallow()],
      });
      const neuron = neuronClient.neuron(
        { obj: sharedObject },
        { key: "testNeuronClient" }
      );

      neuron.set({ obj: sharedObject });
      expect(neuron.getRef()).toEqual({ obj: sharedObject });
    });
  });

  describe("Shallow Equality Logic", () => {
    it("should detect shallow equality for identical arrays", () => {
      const arrayA = [1, 2, 3];
      const arrayB = [1, 2, 3];
      expect(shallowEqual(arrayA, arrayB)).toBe(true);
    });

    it("should detect shallow inequality for arrays with different elements", () => {
      const arrayA = [1, 2, 3];
      const arrayB = [1, 2, 4];
      expect(shallowEqual(arrayA, arrayB)).toBe(false);
    });

    it("should detect shallow equality for identical objects", () => {
      const objA = { a: 1, b: 2 };
      const objB = { a: 1, b: 2 };
      expect(shallowEqual(objA, objB)).toBe(true);
    });

    it("should detect shallow inequality for objects with different values", () => {
      const objA = { a: 1, b: 2 };
      const objB = { a: 1, b: 3 };
      expect(shallowEqual(objA, objB)).toBe(false);
    });

    it("should detect inequality for non-object types", () => {
      expect(shallowEqual(1, 1)).toBe(false);
      expect(shallowEqual("a", "a")).toBe(false);
      expect(shallowEqual(null, null)).toBe(false);
    });
  });
});
