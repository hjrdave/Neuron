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

const { useDispatch, useNeuron, State } = createStore<State>();

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
    const _fruit = renderHook(() => useNeuron("fruit"));
    const _pokemon = renderHook(() => useNeuron("pokemon"));
    expect(_fruit.result.current[0]).toBe(StateValues.Fruit);
    expect(_pokemon.result.current[0]).toBe(StateValues.Pokemon);
  });
  it("Update state with useDispatch", () => {
    const _fruit = renderHook(() => useNeuron("fruit"));
    const _pokemon = renderHook(() => useNeuron("pokemon"));
    const dispatchFruit = renderHook(() => useDispatch("fruit"));
    const dispatchPokemon = renderHook(() => useDispatch("pokemon"));
    dispatchFruit.result.current((payload) => {
      payload.state = "orange";
    });
    dispatchPokemon.result.current((payload) => {
      payload.state = "Jigglypuff";
    });
    expect(_fruit.result.current[0]).toBe("orange");
    expect(_pokemon.result.current[0]).toBe("Jigglypuff");
  });
});
