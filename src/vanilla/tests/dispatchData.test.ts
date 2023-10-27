import NeuronGSM from "../index";

interface State{
    fruit: string;
}
enum StateKeys {
    Fruit = "fruit"
}
enum StateValues {
    Fruit = "Apple"
}
const Store = NeuronGSM.Store<State>();

Store.add<string, {foo: string}>({
    key: StateKeys.Fruit,
    state: StateValues.Fruit,
    features: {
        onRun: (payload) => {
            const data = payload.data;
            payload.state = `${data?.foo} ${payload.prevState}`;
        }
    }
});

describe("Make sure dispatch data is passed.", () => {
    it("Fruit state should be updated", () => {
        expect(Store.get(StateKeys.Fruit)).toBe(StateValues.Fruit);
        Store.dispatch<string, {foo: string}>('fruit', (payload) => {
            payload.data = {foo: 'Big'}
        });
       expect(Store.get(StateKeys.Fruit)).toBe('Big Apple');
    });
});