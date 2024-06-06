import { createStore } from "../index";
import { it, expect, describe } from "vitest";
import { render } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

interface State {
  pokemon: string;
  message: string;
}
enum StateKeys {
  Pokemon = "pokemon",
  Message = "message",
}
const initialPokemon = "pikachu";
const initialMsg = "Default Message";
const { useNeuron, State } = createStore<State>();

function Store() {
  return (
    <>
      <State name={StateKeys.Message} state={initialMsg} />
      <State
        name={StateKeys.Pokemon}
        state={initialPokemon}
        onLoad={(payload) => {
          payload.state = "mewtwo";
        }}
        onRun={(payload) => {
          payload.state = `dark ${payload.state}`;
        }}
        onCallback={(payload) => {
          payload.set("message", `Pokemon was set to ${payload.state}`);
        }}
      />
    </>
  );
}

describe("Test state feature middleware", () => {
  it("Initialize Store", () => {
    render(<Store />);
  });
  it("Check initial state", () => {
    const _pokemon = renderHook(() => useNeuron<string>(StateKeys.Pokemon));
    const _message = renderHook(() => useNeuron<string>(StateKeys.Message));
    expect(_message.result.current[0]).toBe(initialMsg);
    expect(_pokemon.result.current[0]).toBe("mewtwo");
  });
  it("Check that onLoad changed default value", () => {
    const _pokemon = renderHook(() => useNeuron<string>(StateKeys.Pokemon));
    expect(_pokemon.result.current[0]).toBe("mewtwo");
  });
  it("Check that onRun changed dispatched value", () => {
    const _pokemon = renderHook(() => useNeuron<string>(StateKeys.Pokemon));
    const setPokemon = _pokemon.result.all[0][1];
    setPokemon("pikachu");
    expect(_pokemon.result.current[0]).toBe("dark pikachu");
  });
  it("Check that onCallback updated message state", () => {
    const _message = renderHook(() => useNeuron<string>(StateKeys.Message));
    expect(_message.result.current[0]).toBe("Pokemon was set to dark pikachu");
  });
});
