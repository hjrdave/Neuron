import { expect, test } from "vitest";

import { createStore } from "../index";

interface State {
  fruit: string;
  person: string;
  car: string;
}
enum StateKeys {
  Fruit = "fruit",
  Person = "person",
  Car = "car",
}
enum StateValues {
  Fruit = "Apple",
  Person = "James",
  Car = "Toyota",
}
const Store = createStore<State>();

Store.add<string>({
  key: StateKeys.Fruit,
  state: StateValues.Fruit,
});

Store.add<string>({
  key: StateKeys.Person,
  state: StateValues.Person,
});

Store.add<string>({
  key: StateKeys.Car,
  state: StateValues.Car,
});

test("Make sure initial state is correct.", () => {
  expect(Store.get("fruit")).toBe(StateValues.Fruit);

  expect(Store.get("person")).toBe(StateValues.Person);

  expect(Store.get("car")).toBe(StateValues.Car);
});

test("Make sure getStore methods work as expected.", () => {
  const storeItem = Store.getStore()[0];
  const expectedValue = {
    key: "fruit",
    state: StateValues.Fruit,
  };
  expect(storeItem.key).toBe(expectedValue.key);
  expect(storeItem.state).toBe(expectedValue.state);
});
