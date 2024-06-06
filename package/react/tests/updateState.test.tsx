import { createStore } from "../index";
import { it, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

interface State {
  fruit: string;
  pokemon: string;
}
enum StateKeys {
  Fruit = "fruit",
  Pokemon = "pokemon",
}
enum StateValues {
  Fruit = "apple",
  Pokemon = "Pikachu",
}

const { useNeuron, State } = createStore<State>();

function Store() {
  return (
    <>
      <State name={StateKeys.Fruit} state={StateValues.Fruit} />
      <State name={StateKeys.Pokemon} state={StateValues.Pokemon} />
    </>
  );
}

describe("Update state", () => {
  it("Initialize Store", () => {
    render(<Store />);
  });
  it("Check initial state values", () => {
    const _fruit = renderHook(() => useNeuron<string>(StateKeys.Fruit));
    const _pokemon = renderHook(() => useNeuron<string>(StateKeys.Pokemon));
    expect(_fruit.result.current[0]).toBe(StateValues.Fruit);
    expect(_pokemon.result.current[0]).toBe(StateValues.Pokemon);
  });
  it("Update state values", () => {
    const _fruit = renderHook(() => useNeuron<string>(StateKeys.Fruit));
    const _pokemon = renderHook(() => useNeuron<string>(StateKeys.Pokemon));
    const setFruit = _fruit.result.all[0][1];
    const setPokemon = _pokemon.result.all[0][1];
    setFruit("orange");
    setPokemon("Jigglypuff");
    expect(_fruit.result.current[0]).toBe("orange");
    expect(_pokemon.result.current[0]).toBe("Jigglypuff");
  });
  it("Update state values with prev state", () => {
    const _fruit = renderHook(() => useNeuron<string>(StateKeys.Fruit));
    const _pokemon = renderHook(() => useNeuron<string>(StateKeys.Pokemon));
    const setFruit = _fruit.result.all[0][1];
    const setPokemon = _pokemon.result.all[0][1];
    setFruit((prev) => `Big ${prev}`);
    setPokemon((prev) => `Big ${prev}`);
    expect(_fruit.result.current[0]).toBe("Big orange");
    expect(_pokemon.result.current[0]).toBe("Big Jigglypuff");
  });
});
