import { expect, test } from "vitest";
import { createStore } from "../index";

interface State {
  fruit: string;
}

const Store = createStore<State>();

Store.add({
  key: "fruit",
  state: "Apple",
});

test("Make sure initial state is correct.", () => {
  Store.onDispatch((payload) => {
    expect(payload.state).toBe("Apple");
  });
});
