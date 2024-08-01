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
  expect(Store.get("fruit")).toBe("Apple");

  expect(Store.get("person")).toBe("James");

  expect(Store.get("car")).toBe("Toyota");
});
