import Neuron from "../index";

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

Store.add<string>({
  key: StateKeys.Fruit,
  state: StateValues.Fruit,
});

describe("Make sure initial state is correct.", () => {
  it("Makes sure onDispatch doesn't throw error", () => {
    Store.onDispatch((payload) => {
      expect(payload.state).toBe(StateValues.Fruit);
    });
  });
});
