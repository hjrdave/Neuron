import { NeuronClient } from "../NeuronClient";
import { it, expect, describe } from "vitest";
import { renderHook } from "@testing-library/react-hooks";

const { neuron } = new NeuronClient();

const usePokemon = neuron("Pikachu", {
  onLoad: (payload) => {
    payload.state = "mewtwo";
  },
  onRun: (payload) => {
    payload.state = `dark ${payload.state}`;
  },
  onCallback: (payload) => {
    payload.set("message", `Pokemon was set to ${payload.state}`);
  },
});
const useMessage = neuron("Default Message", { key: "message" });

describe("Test state feature middleware", () => {
  it("Check initial state is changed by onLoad", () => {
    const _pokemon = renderHook(() => usePokemon());
    const _message = renderHook(() => useMessage());
    expect(_message.result.current[0]).toBe("Default Message");
    expect(_pokemon.result.current[0]).toBe("mewtwo");
  });
  it("Check that onRun changed dispatched value", () => {
    const _pokemon = renderHook(() => usePokemon());
    const { set: setPokemon } = _pokemon.result.all[0][1];
    setPokemon("pikachu");
    expect(_pokemon.result.current[0]).toBe("dark pikachu");
  });
  it("Check that onCallback updated message state", () => {
    const _message = renderHook(() => useMessage());
    expect(_message.result.current[0]).toBe("Pokemon was set to dark pikachu");
  });
});
