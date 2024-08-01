import { createStore } from "../index";
import { it, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

interface Trainer {
  name: string;
  age: number;
}
interface Pokemon {
  name: string;
  level: number;
}
interface State {
  trainer: Trainer;
  pokemon: Pokemon;
}
enum StateKeys {
  Trainer = "trainer",
  Pokemon = "pokemon",
}
const initialTrainer = { name: "Ash", age: 10 };
const initialPokemon = { name: "Pikachu", level: 100 };
const { useNeuron, State } = createStore<State>();

function Store() {
  return (
    <>
      <State name={StateKeys.Trainer} state={initialTrainer} />
      <State name={StateKeys.Pokemon} state={initialPokemon} />
    </>
  );
}

describe("Make sure state is immutable", () => {
  it("Initialize Store", () => {
    render(<Store />);
  });
  it("Check initial state values", () => {
    const _trainer = renderHook(() => useNeuron(StateKeys.Trainer));
    const _pokemon = renderHook(() => useNeuron(StateKeys.Pokemon));
    expect(_trainer.result.current[0]).toBe(initialTrainer);
    expect(_pokemon.result.current[0]).toBe(initialPokemon);
  });
  it("Make sure store state is immutable", () => {
    const _trainer = renderHook(() => useNeuron(StateKeys.Trainer));
    const _pokemon = renderHook(() => useNeuron(StateKeys.Pokemon));
    const trainer = _trainer.result.current[0];
    const pokemon = _pokemon.result.current[0];
    trainer.name = "Gary";
    pokemon.name = "Nidoking";
    expect(_trainer.result.current[0].name).toBe(initialTrainer.name);
    expect(_pokemon.result.current[0].name).toBe(initialPokemon.name);
  });
});
