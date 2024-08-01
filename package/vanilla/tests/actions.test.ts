import { createStore } from "../index";

import { expect, test } from "vitest";
interface State {
  fruit: string;
}
enum StateValues {
  Fruit = "Apple",
}

interface Actions {
  fruit: {
    changeFruitToOrange: () => void;
    changeFruitToKiwi: () => void;
  };
}

const Store = createStore<State, Actions>();

Store.add({
  key: "fruit",
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

const fruitActions = Store.getActions("fruit");
test("Test action methods.", () => {
  expect(Store.get("fruit")).toBe("Apple");
  fruitActions.changeFruitToKiwi();
  expect(Store.get("fruit")).toBe("Apple Kiwi");
  fruitActions.changeFruitToOrange();
  expect(Store.get("fruit")).toBe("Orange");
});
