import Neuron from "../index";

import { expect, test, it } from "vitest";
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

interface FruitActions {
  changeFruitToOrange: () => void;
  changeFruitToKiwi: () => void;
}
Store.add<string, FruitActions>({
  //types are wrong
  key: StateKeys.Fruit,
  state: StateValues.Fruit,
  actions: (dispatch) => ({
    changeFruitToOrange: () => {
      dispatch((payload) => {
        payload.state = "Orange";
      });
    },
    changeFruitToKiwi: () => {
      dispatch((payload) => {
        payload.state = `${payload.prevState} Kiwi`;
      });
    },
  }),
});

const fruitActions = Store.getActions<FruitActions>("fruit");

test("Test action methods.", () => {
  expect(Store.get("fruit")).toBe("Apple");
  fruitActions.changeFruitToKiwi();
  expect(Store.get("fruit")).toBe("Apple Kiwi");
  fruitActions.changeFruitToOrange();
  expect(Store.get("fruit")).toBe("Orange");
});
