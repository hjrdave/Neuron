import { expect, test } from "vitest";
import { createStore } from "../index";

interface Pokemon {
  number: number;
  name: string;
  level: number;
  entry: string;
  found: string;
}
interface State {
  pokemon: Pokemon;
}
const Store = createStore<State>();

Store.add<Pokemon>({
  key: "pokemon",
  state: {
    number: 150,
    name: "Mewtwo",
    level: 100,
    entry:
      "It was created by a scientist after years of horrific gene splicing and DNA engineering experiments.",
    found: "Cerulean Cave",
  },
  features: {
    onRun: (payload) => {
      if (payload.prevState.name === "Mewtwo") {
        payload.state.level = 200;
        payload.cancelDispatch();
      }
    },
  },
});

test("Make sure initial state is correct.", () => {
  const currentState = Store.get<Pokemon>("pokemon");
  expect(currentState.level).toBe(100);
});

test("Make sure get state is immutable.", () => {
  const currentState = Store.get<Pokemon>("pokemon");
  currentState.level = 101;
  const nextState = Store.get<Pokemon>("pokemon");
  expect(nextState.level).toBe(100);
});

test("Make sure payload is immutable.", () => {
  const currentState = Store.get<Pokemon>("pokemon");
  expect(currentState.level).toBe(100);
  Store.set("pokemon", { ...currentState, name: "Mew" });
  const nextState = Store.get<Pokemon>("pokemon");
  expect(nextState.name).toBe("Mewtwo");
  expect(nextState.level).toBe(100);
});
