import { NeuronClient } from "../NeuronClient";
import { it, expect, describe } from "vitest";
import { renderHook } from "@testing-library/react-hooks";

const { neuron } = new NeuronClient();

const useFruit = neuron("apple");
const usePokemon = neuron("Pikachu");

describe("Setup initial Store", () => {
  it("Check initial state values", () => {
    const fruit = renderHook(() => useFruit());
    const pokemon = renderHook(() => usePokemon());
    expect(fruit.result.current[0]).toBe("apple");
    expect(pokemon.result.current[0]).toBe("Pikachu");
  });
});
