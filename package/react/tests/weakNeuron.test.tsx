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

const { useWeakNeuron, State } = createStore<State>();

function Store() {
  return (
    <>
      <State name={StateKeys.Fruit} state={StateValues.Fruit} />
      <State name={StateKeys.Pokemon} state={StateValues.Pokemon} />
    </>
  );
}

describe("Update state with a weak neuron", () => {
  it("Initialize Store", () => {
    render(<Store />);
  });
  it("Check initial state values", () => {
    const _fruit = renderHook(() => useWeakNeuron<string>(StateKeys.Fruit));
    const _pokemon = renderHook(() => useWeakNeuron<string>(StateKeys.Pokemon));
    expect(_fruit.result.current[0]).toBe(StateValues.Fruit);
    expect(_pokemon.result.current[0]).toBe(StateValues.Pokemon);
  });
  it("Update state", () => {
    const _fruit = renderHook(() => useWeakNeuron<string>(StateKeys.Fruit));
    const _pokemon = renderHook(() => useWeakNeuron<string>(StateKeys.Pokemon));
    const setFruit = _fruit.result.all[0][1];
    const setPokemon = _pokemon.result.all[0][1];
    setFruit("orange");
    setPokemon("Jigglypuff");
    expect(_fruit.result.current[0]).toBe("orange");
    expect(_pokemon.result.current[0]).toBe("Jigglypuff");
  });
});
