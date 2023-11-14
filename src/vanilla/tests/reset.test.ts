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

test("Reset Store State.", () => {
  Store.set(StateKeys.Fruit, "Fooberry");
  Store.set(StateKeys.Car, "Ford");
  Store.set(StateKeys.Person, "Tom");

  Store.reset();

  expect(Store.get(StateKeys.Fruit)).toBe(StateValues.Fruit);
  expect(Store.get(StateKeys.Car)).toBe(StateValues.Car);
  expect(Store.get(StateKeys.Person)).toBe(StateValues.Person);

  Store.set(StateKeys.Fruit, "Fooberry");
  Store.set(StateKeys.Car, "Ford");
  Store.set(StateKeys.Person, "Tom");

  Store.reset("fruit");
  Store.reset("car");
  Store.reset("person");

  expect(Store.get(StateKeys.Fruit)).toBe(StateValues.Fruit);
  expect(Store.get(StateKeys.Car)).toBe(StateValues.Car);
  expect(Store.get(StateKeys.Person)).toBe(StateValues.Person);
});
