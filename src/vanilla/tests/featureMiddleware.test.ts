import { expect, test, it } from "vitest";
import Neuron from "../index";

interface State {
  fruit: string;
  person: string;
  color: string;
  animal: string;
  teacher: string;
  car: string;
}
enum StateKeys {
  Fruit = "fruit",
  Person = "person",
  Color = "color",
  Animal = "animal",
  Teacher = "teacher",
  Car = "car",
}
enum StateValues {
  Fruit = "Apple",
  Person = "Bob",
  Color = "Red",
  Animal = "Monkey",
  Teacher = "Mr. Anderson",
  Car = "Ford",
}
const Store = Neuron.Store<State>();

test("Check OnRun Feature Middleware.", () => {
  Store.add<string>({
    key: StateKeys.Fruit,
    state: StateValues.Fruit,
    features: {
      onRun: (payload) => {
        expect(payload.key).toBe(StateKeys.Fruit);
        expect(payload.prevState).toBe(StateValues.Fruit);
        expect(payload.state).toBe("Pineapple");
      },
    },
  });
  Store.set(StateKeys.Fruit, "Pineapple");

  Store.add<string>({
    key: StateKeys.Person,
    state: StateValues.Person,
    features: {
      onRun: (payload) => {
        payload.state = `Ultra ${payload.state}`;
      },
    },
  });
  Store.set(StateKeys.Person, "MAGA");
  expect(Store.get(StateKeys.Person)).toBe(`Ultra MAGA`);

  Store.add<string>({
    key: StateKeys.Color,
    state: StateValues.Color,
    features: {
      onRun: (payload) => {
        payload.cancelDispatch();
      },
    },
  });
  Store.set(StateKeys.Color, "Purple");
  expect(Store.get(StateKeys.Color)).toBe(StateValues.Color);
});

test("Check OnLoad Feature Middleware.", () => {
  Store.add<string>({
    key: StateKeys.Animal,
    state: StateValues.Animal,
    features: {
      onLoad: (payload) => {
        expect(payload.key).toBe(StateKeys.Animal);
        expect(payload.prevState).toBeUndefined();
        expect(payload.state).toBe(StateValues.Animal);
      },
    },
  });

  Store.add<string>({
    key: StateKeys.Teacher,
    state: StateValues.Teacher,
    features: {
      onLoad: (payload) => {
        expect(payload.state).toBe(StateValues.Teacher);
        payload.state = `Dr. Phil`;
      },
    },
  });
  expect(Store.get(StateKeys.Teacher)).toBe("Dr. Phil");
});

test("Check OnLoad Feature Middleware.", () => {
  Store.add<string>({
    key: StateKeys.Animal,
    state: StateValues.Animal,
    features: {
      onLoad: (payload) => {
        expect(payload.key).toBe(StateKeys.Animal);
        expect(payload.prevState).toBeUndefined();
        expect(payload.state).toBe(StateValues.Animal);
      },
    },
  });

  Store.add<string>({
    key: StateKeys.Teacher,
    state: StateValues.Teacher,
    features: {
      onLoad: (payload) => {
        expect(payload.state).toBe(StateValues.Teacher);
        payload.state = `Dr. Phil`;
      },
    },
  });
  expect(Store.get(StateKeys.Teacher)).toBe("Dr. Phil");
});

test("Check OnCallback Feature Middleware.", () => {
  Store.add<string>({
    key: StateKeys.Car,
    state: StateValues.Car,
    features: {
      onLoad: (payload) => {
        expect(payload.state).toBe(StateValues.Car);
      },
      onRun: (payload) => {
        expect(payload.state).toBe("Chevy");
        payload.state = `Blue ${payload.state}`;
      },
      onCallback: (payload) => {
        expect(payload.key).toBe(StateKeys.Car);
        expect(payload.prevState).toBe(StateValues.Car);
        expect(payload.state).toBe("Blue Chevy");
      },
    },
  });
  Store.set(StateKeys.Car, "Chevy");
});
