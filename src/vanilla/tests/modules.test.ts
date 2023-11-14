import { expect, test, it } from "vitest";
import Neuron from "../index";

interface State {
  fruit: string;
  car: string;
}
enum StateKeys {
  Fruit = "fruit",
  Car = "car",
}
enum StateValues {
  Fruit = "Apple",
  Car = "truck",
}
const Store = Neuron.Store<State>();

const TestModule = {
  name: "testModule",
  onLoad: (payload) => {
    payload.state = `OnLoad ${payload.state}`;
  },
  onRun: (payload) => {
    payload.state = `OnRun ${payload.state}`;
  },
  onCallback: (payload) => {
    if (payload.key === StateKeys.Fruit) {
      const set = payload.set;
      set(StateKeys.Car, "OnCallback");
    }
  },
};

const TestModule2 = {
  name: "testModule2",
  onLoad: (payload) => {
    payload.state = `Module2 ${payload.state}`;
  },
};

Store.use(TestModule);
Store.use(TestModule2);

Store.add<string>({
  key: StateKeys.Fruit,
  state: StateValues.Fruit,
});

Store.add<string>({
  key: StateKeys.Car,
  state: StateValues.Car,
});

test("Modules fire correctly.", () => {
  it("Module onload transforms fruit initial state.", () => {
    expect(Store.get(StateKeys.Fruit)).toBe("Module2 OnLoad Apple");
  });
  it("Module onRun transforms fruit on dispatch.", () => {
    expect(Store.get(StateKeys.Fruit)).toBe("Module2 OnLoad Apple");
    Store.set(StateKeys.Fruit, "Pineapple");
    expect(Store.get(StateKeys.Fruit)).toBe("OnRun Pineapple");
  });
  it("Module onCallback sets car state.", () => {
    expect(Store.get(StateKeys.Car)).toBe("OnRun OnCallback");
  });
});
