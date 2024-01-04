import { expect, test } from "vitest";
import Neuron from "../src/index";

interface State {
  fruit: string;
}
enum StateKeys {
  Fruit = "fruit",
}
enum StateValues {
  Fruit = "Apple",
}
const Store = Neuron.Store<State>();

Store.add<string, { foo: string }>({
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
  Store.dispatch<string, { foo: string }>("fruit", (payload) => {
    payload.data = { foo: "Big" };
  });
  expect(Store.get(StateKeys.Fruit)).toBe("Big Apple");
});
