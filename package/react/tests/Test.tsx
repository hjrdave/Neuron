import { convertSelector } from "../../slices";
import { createStore } from "../index";
import { StateAndActions, useNeuronNew } from "../useNeuronNew";
import { Selector } from "../useNeuronNew";

interface State {
  fruit: string;
  count: number;
  person: {
    name: string;
    age: number;
  };
}

interface Actions {
  fruit: {
    updateFruit: () => void;
    resetFruit: () => void;
  };
  count: {
    increment: () => void;
    decrement: () => void;
  };
}

const { State, bridge } = createStore<State, Actions>();

export const { useFruit, setFruit, getFruit } = neuron({
  name: "fruit",
  state: "apple",
  actions: () => ({ increment: () => {}, decrement: () => {} }),
});

const { useCount, setCount, getCount } = neuron<T, A>({
  name: "count",
  state: 0,
  actions: () => ({ increment: () => {}, decrement: () => {} }),
});

function Store() {
  return (
    <>
      <State
        name="fruit"
        state={"apple"}
        actions={() => ({
          updateFruit: () => {},
          resetFruit: () => {},
        })}
      />
      <State
        name="count"
        state={0}
        actions={() => ({ increment: () => {}, decrement: () => {} })}
      />
      <State name="person" state={{ name: "Bob", age: 20 }} />
    </>
  );
}

const useNeuron = <T, AT>(selector: (store: State) => T) =>
  useNeuronNew<State, Actions, T, AT>(selector, bridge.connect());

function Comp() {
  const [count, countActions] = useNeuron((store) => store.count);

  return <></>;
}

export function App() {
  return (
    <>
      <Store />
      <Comp />
    </>
  );
}
