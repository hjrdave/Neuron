// import { createStore } from "../../react";
// import { Selector, useNeuronNew } from "../useNeuronNew";

// interface State {
//   fruit: string;
//   count: number;
//   person: {
//     name: string;
//     age: number;
//   };
// }

// interface Actions {
//   fruit: {
//     updateFruit: () => void;
//     resetFruit: () => void;
//   };
//   count: {
//     increment: () => void;
//     decrement: () => void;
//   };
//   person: {
//     updatePerson: () => void;
//     resetPerson: () => void;
//   };
// }

// const { State, bridge } = createStore<State, Actions>();

// function Store() {
//   return (
//     <>
//       <State
//         name="fruit"
//         state={"apple"}
//         actions={() => ({
//           updateFruit: () => {},
//           resetFruit: () => {},
//         })}
//       />
//       <State
//         name="count"
//         state={0}
//         actions={() => ({ increment: () => {}, decrement: () => {} })}
//       />
//       <State name="person" state={{ name: "Bob", age: 20 }} />
//     </>
//   );
// }
// const useNeuron = <T,>(selector: Selector<State, T>) =>
//   useNeuronNew<State, Actions, T>(selector, bridge.connect());

// function Comp() {
//   const [fruit, fruitActions] = useNeuron((store) => store.fruit);
//   const [count, countActions] = useNeuron((store) => store.count);
//   const [person, personActions] = useNeuron((store) => store.person);
//   countActions.decrement();
//   fruitActions.updateFruit();
//   personActions.updatePerson();
//   return (
//     <>
//       <p>{fruit}</p>
//       <p>{count}</p>
//       <p>{person.age}</p>
//     </>
//   );
// }
// export function App() {
//   return (
//     <>
//       <Store />
//       <Comp />
//     </>
//   );
// }
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
  person: {
    updatePerson: () => void;
    resetPerson: () => void;
  };
}
type ExtractKey<T> = T extends (state: infer S) => infer K ? K : never;
type InferStateAndActions<K extends keyof State> = {
  state: State[K];
  actions: Actions[K];
};
type Selector = (store: State) => keyof State;

type InferFromSelector<S extends Selector> = InferStateAndActions<
  ExtractKey<S>
>;
const fruitSelector: Selector = (store) => "fruit";
type FruitStateAndActions = InferFromSelector<typeof fruitSelector>;
const { state, actions } = {} as FruitStateAndActions;
//FruitStateAndActions will have the following inferred type:
// {
//   state: string;
//   actions: {
//     updateFruit: () => void;
//     resetFruit: () => void;
//   };
// }
