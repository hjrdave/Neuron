import { expect, test } from "vitest";
import { createStore } from "../index";

interface State {
  fruit: string;
  person: string;
  car: string;
}

const Store = createStore<State>();

Store.add({
  key: "fruit",
  state: "Apple",
});

Store.add({
  key: "person",
  state: "James",
});

Store.add({
  key: "car",
  state: "Toyota",
});

test("Make sure initial state is correct.", () => {
  const currentState = Store.get("fruit");
  expect(currentState).toBe("Apple");

  Store.set("fruit", "Orange");
  const nextState = Store.get("fruit");
  expect(nextState).toBe("Orange");

  Store.set("fruit", "PineApple");
  const nextState2 = Store.get("fruit");
  expect(nextState2).toBe("PineApple");
});
