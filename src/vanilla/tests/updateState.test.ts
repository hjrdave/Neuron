import { expect, test, it } from "vitest";
import Neuron from "../index";

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
const Store = Neuron.Store<State>();

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
  it("Fruit state should be updated", () => {
    const currentState = Store.get(StateKeys.Fruit);
    expect(currentState).toBe(StateValues.Fruit);

    Store.set(StateKeys.Fruit, "Orange");
    const nextState = Store.get(StateKeys.Fruit);
    expect(nextState).toBe("Orange");

    Store.set(StateKeys.Fruit, "PineApple");
    const nextState2 = Store.get(StateKeys.Fruit);
    expect(nextState2).toBe("PineApple");
  });
});
