import { createStore } from "../index";
import { it, expect, describe } from "vitest";

interface Trainer {
  name: string;
  age: number;
  pokemon: number;
}
interface State {
  fruit: string;
  pokemon: string;
  trainer: Trainer;
}
enum StateValues {
  Fruit = "apple",
  Pokemon = "Pikachu",
}
const trainer: Trainer = {
  name: "Ash",
  age: 10,
  pokemon: 6,
};
const { State, getState, getStateRef, setState, addState } =
  createStore<State>();

describe("Check core methods", () => {
  it("Add state to store", () => {
    addState({
      key: "fruit",
      state: "apple",
    });
    addState({
      key: "pokemon",
      state: "Pikachu",
    });
    addState({
      key: "trainer",
      state: trainer,
    });
  });
  it("Check initial state values", () => {
    const fruit = getState("fruit");
    const pokemon = getState("pokemon");
    const fruitRef = getStateRef("fruit");
    const pokemonRef = getStateRef("pokemon");
    expect(fruit).toBe(StateValues.Fruit);
    expect(pokemon).toBe(StateValues.Pokemon);
    expect(fruitRef).toBe(StateValues.Fruit);
    expect(pokemonRef).toBe(StateValues.Pokemon);
  });
  it("Update state values", () => {
    setState("fruit", "orange");
    setState("pokemon", "Mewtwo");
  });
  it("Check update state values", () => {
    const fruit = getState("fruit");
    const pokemon = getState("pokemon");
    const fruitRef = getStateRef("fruit");
    const pokemonRef = getStateRef("pokemon");
    expect(fruit).toBe("orange");
    expect(pokemon).toBe("Mewtwo");
    expect(fruitRef).toBe("orange");
    expect(pokemonRef).toBe("Mewtwo");
  });
  it("Check immutability of getState method", () => {
    const trainer = getState("trainer");
    trainer.name = "Gary";
    const clonedTrainer = getState("trainer");
    expect(clonedTrainer.name).toBe("Ash");
  });
  it("Check immutability of getStateRef method", () => {
    const trainer = getStateRef("trainer");
    trainer.name = "Gary";
    const refTrainer = getStateRef("trainer");
    expect(refTrainer.name).toBe("Gary");
  });
});
