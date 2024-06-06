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

describe("Setup initial Store", () => {
  it("Initialize Store", () => {
    render(<Store />);
  });
  it("Check initial state values", () => {
    const fruit = renderHook(() => useNeuron(StateKeys.Fruit));
    const pokemon = renderHook(() => useNeuron(StateKeys.Pokemon));
    expect(fruit.result.current[0]).toBe(StateValues.Fruit);
    expect(pokemon.result.current[0]).toBe(StateValues.Pokemon);
  });
});
