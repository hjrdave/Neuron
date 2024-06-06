import { createPrivateStore } from "../index";
import { it, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import { useEffect, useRef } from "react";

interface State {
  fruit: string;
  pokemon: string;
}
enum StateKeys {
  Fruit = "fruit",
  Pokemon = "pokemon",
}
enum StateValues {
  Fruit = "apple",
  Pokemon = "Pikachu",
}

const { useNeuron, usePrivateStore, Private } = createPrivateStore<State>();

function Store({ children }: React.PropsWithChildren) {
  const { State } = usePrivateStore();
  return (
    <>
      <State name={StateKeys.Fruit} state={StateValues.Fruit} />
      <State name={StateKeys.Pokemon} state={StateValues.Pokemon} />
      <Private>{children}</Private>
    </>
  );
}
function Comp1() {
  const [fruit, setFruit] = useNeuron(StateKeys.Fruit);
  const [pokemon, setPokemon] = useNeuron(StateKeys.Pokemon);
  useEffect(() => {
    expect(fruit).toBe(StateValues.Fruit);
    expect(pokemon).toBe(StateValues.Pokemon);
  }, []);
  useEffect(() => {
    setFruit("orange");
    setPokemon("Mewtwo");
  }, []);
  return null;
}
function Comp2() {
  const isMounted = useRef(false);
  const [fruit] = useNeuron(StateKeys.Fruit);
  const [pokemon] = useNeuron(StateKeys.Pokemon);
  useEffect(() => {
    if (isMounted.current) {
      expect(fruit).toBe("orange");
      expect(pokemon).toBe("Mewtwo");
    } else {
      isMounted.current = true;
    }
  }, [fruit, pokemon]);

  return null;
}
function Comp3() {
  const fruit = useNeuron(StateKeys.Fruit);
  const pokemon = useNeuron(StateKeys.Pokemon);
  useEffect(() => {
    console.log(fruit, pokemon);
    expect(fruit).toBe(undefined);
    expect(pokemon).toBe(undefined);
  }, [fruit, pokemon]);

  return null;
}

describe("Setup initial Private Store", () => {
  it("Initialize Comp with Private Store", () => {
    render(
      <>
        <Store>
          <Comp1 />
          <Comp2 />
        </Store>
        {/*Will throw error: Out of scope*/}
        <Comp3 />
      </>
    );
  });
});
