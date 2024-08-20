import { NeuronClient } from "../NeuronClient";
import { it, expect, describe } from "vitest";
import { renderHook } from "@testing-library/react-hooks";

const { neuron } = new NeuronClient();

const initialTrainer = { name: "Ash", age: 10 };
const useTrainer = neuron(initialTrainer);

const initialPokemon = { name: "Pikachu", level: 100 };
const usePokemon = neuron(initialPokemon);

describe("Make sure state is immutable", () => {
  it("Check initial state values", () => {
    const _trainer = renderHook(() => useTrainer());
    const _pokemon = renderHook(() => usePokemon());
    expect(_trainer.result.current[0]).toBe(initialTrainer);
    expect(_pokemon.result.current[0]).toBe(initialPokemon);
  });
  it("Make sure store state is immutable", () => {
    const _trainer = renderHook(() => useTrainer());
    const _pokemon = renderHook(() => usePokemon());
    const trainer = _trainer.result.current[0];
    const pokemon = _pokemon.result.current[0];
    trainer.name = "Gary";
    pokemon.name = "Nidoking";
    expect(_trainer.result.current[0].name).toBe(initialTrainer.name);
    expect(_pokemon.result.current[0].name).toBe(initialPokemon.name);
  });
});
