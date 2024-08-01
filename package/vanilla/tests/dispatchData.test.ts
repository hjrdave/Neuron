import { expect, test } from "vitest";
import { createStore } from "../index";

interface State {
  fruit: string;
}
enum StateKeys {
  Fruit = "fruit",
}
enum StateValues {
  Fruit = "Apple",
}
const Store = createStore<State>();

Store.add({
  key: StateKeys.Fruit,
  state: StateValues.Fruit,
  features: {
    onRun: (payload) => {
      const data = payload.data;
      payload.state = `${data?.foo} ${payload.prevState}`;
    },
  },
});

test("Make sure dispatch data is passed.", () => {
  expect(Store.get(StateKeys.Fruit)).toBe(StateValues.Fruit);
  Store.dispatch("fruit", (payload) => {
    payload.data = { foo: "Big" };
  });
  expect(Store.get(StateKeys.Fruit)).toBe("Big Apple");
});
