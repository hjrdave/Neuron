import { NeuronClient } from "../core";
import { Neuron } from "../core/Neuron";
import { Persist } from "./persist";
import { beforeEach, describe, expect, it } from "vitest";

// Mock localStorage and sessionStorage
beforeEach(() => {
  // Clear out localStorage and sessionStorage before each test to prevent side effects
  localStorage.clear();
  sessionStorage.clear();
});

describe("Persist Module", () => {
  describe("Neuron", () => {
    it("should save state to localStorage when persist is 'local'", () => {
      const key = "testNeuron";
      const storageKey = `@sandstack/neuron-persist/${key}`;
      const initialState = { count: 0 };
      const neuron = new Neuron(initialState, { key, modules: [Persist()] });

      // Check if the state was saved to localStorage
      expect(JSON.parse(localStorage.getItem(storageKey)!)).toEqual({
        count: 0,
      });

      // Update the state
      neuron.set({ count: 1 });

      // Check if the state was updated in localStorage
      expect(JSON.parse(localStorage.getItem(storageKey)!)).toEqual({
        count: 1,
      });
    });

    it("should save state to sessionStorage when persist is 'session'", () => {
      const key = "testNeuronSession";
      const initialState = { count: 0 };
      const neuron = new Neuron(initialState, {
        key,
        modules: [Persist({ storageType: "session" })], //session is not being set for some reason
      });

      // Update the state
      neuron.set({ count: 1 });

      // Check if the state was saved to sessionStorage
      const cachedState = sessionStorage.getItem(
        `@sandstack/neuron-persist/${key}`
      );

      expect(cachedState).toBeDefined();
      expect(JSON.parse(cachedState!)).toEqual({ count: 1 });
    });

    it("should retrieve state from localStorage when persist is 'local'", () => {
      const key = "testNeuronRetrieveLocal";
      const initialState = { count: 0 };

      // First, save some state to localStorage
      localStorage.setItem(
        `@sandstack/neuron-persist/${key}`,
        JSON.stringify({ count: 5 })
      );
      const neuron = new Neuron(initialState, {
        key,
        modules: [Persist({ storageType: "local" })],
      });

      // Check if the state was correctly retrieved
      expect(neuron.getRef()).toEqual({ count: 5 });
    });

    it("should retrieve state from sessionStorage when persist is 'session'", () => {
      const key = "testNeuronRetrieveSession";
      const initialState = { count: 0 };

      // First, save some state to sessionStorage
      sessionStorage.setItem(
        `@sandstack/neuron-persist/${key}`,
        JSON.stringify({ count: 10 })
      );
      const neuron = new Neuron(initialState, {
        key,
        modules: [Persist({ storageType: "session" })],
      });

      // Check if the state was correctly retrieved
      expect(neuron.getRef()).toEqual({ count: 10 });
    });

    it("should work with custom storage functions", () => {
      const key = "testNeuronCustomStorage";
      const initialState = { count: 0 };

      const persist = Persist({
        storage: {
          setItem: (key, state) => {
            localStorage.setItem(`${key}`, JSON.stringify(state));
          },
          getItem: (key) => {
            const cachedState = localStorage.getItem(`${key}`);
            return cachedState != null ? JSON.parse(cachedState) : null;
          },
        },
      });
      const neuron = new Neuron(initialState, { key, modules: [persist] });

      // Check if the state was saved to localStorage
      expect(JSON.parse(localStorage.getItem(key)!)).toEqual({ count: 0 });

      // Update the state
      neuron.set({ count: 1 });

      // Check if the state was updated in localStorage
      expect(JSON.parse(localStorage.getItem(key)!)).toEqual({ count: 1 });
    });
  });

  describe("NeuronClient", () => {
    it("should save and retrieve state using NeuronClient with 'local' persistence", () => {
      const key = "testNeuronClientLocal";
      const initialState = { count: 0 };

      // Instantiate the NeuronClient
      const neuronClient = new NeuronClient({
        modules: [Persist()],
      });

      // Create a neuron with local persistence
      const neuron = neuronClient.neuron(initialState, {
        key,
      });
      // Check if the initial state is saved to localStorage
      const storageKey = `@sandstack/neuron-persist/${key}`;
      expect(JSON.parse(localStorage.getItem(storageKey)!)).toEqual({
        count: 0,
      });

      // Update the state
      neuron.set({ count: 1 });

      // Check if the updated state is saved to localStorage
      expect(JSON.parse(localStorage.getItem(storageKey)!)).toEqual({
        count: 1,
      });

      // Retrieve state from the neuron
      expect(neuron.getRef()).toEqual({ count: 1 });
    });

    it("should save and retrieve state using NeuronClient with 'session' persistence", () => {
      const key = "testNeuronClientSession";
      const initialState = { count: 0 };

      // Instantiate the NeuronClient
      const neuronClient = new NeuronClient({
        modules: [Persist({ storageType: "session" })],
      });

      // Create a neuron with session persistence
      const neuron = neuronClient.neuron(initialState, {
        key,
      });

      // Update the state
      neuron.set({ count: 5 });

      // Check if the state is saved to sessionStorage
      const storageKey = `@sandstack/neuron-persist/${key}`;
      const cachedState = sessionStorage.getItem(storageKey);
      expect(cachedState).toBeDefined();
      expect(JSON.parse(cachedState!)).toEqual({ count: 5 });

      // Retrieve state from the neuron
      expect(neuron.getRef()).toEqual({ count: 5 });
    });

    it("should work with custom storage functions using NeuronClient", () => {
      const key = "testNeuronClientCustomStorage";
      const initialState = { count: 0 };

      // Define custom storage
      const persist = Persist({
        storage: {
          setItem: (key, state) => {
            localStorage.setItem(`${key}`, JSON.stringify(state));
          },
          getItem: (key) => {
            const cachedState = localStorage.getItem(`${key}`);
            return cachedState ? JSON.parse(cachedState) : null;
          },
        },
      });

      // Instantiate the NeuronClient
      const neuronClient = new NeuronClient({
        modules: [persist],
      });

      // Create a neuron with custom storage
      const neuron = neuronClient.neuron(initialState, {
        key,
      });

      // Check if the initial state is saved to custom storage
      expect(JSON.parse(localStorage.getItem(key)!)).toEqual({ count: 0 });

      // Update the state
      neuron.set({ count: 2 });

      // Check if the updated state is saved to custom storage
      expect(JSON.parse(localStorage.getItem(key)!)).toEqual({ count: 2 });

      // Retrieve state from the neuron
      expect(neuron.getRef()).toEqual({ count: 2 });
    });
  });
});
