import { describe, expect, it } from "vitest";
import { shallowEqual } from "./shallow";

interface Person {
  name: string;
  age: number;
  job: {
    company: string;
    salary: number;
  };
}

interface State {
  person: Person;
  list: string[];
}
const StateValues: State = {
  person: {
    name: "Bob",
    age: 35,
    job: {
      company: "Protrans",
      salary: 75000,
    },
  },
  list: ["apple", "pineapple", "orange"],
};

describe("Test shallow check function from Shallow module for objects", () => {
  it("Initial check", () => {
    expect(shallowEqual(StateValues.person, StateValues.person)).toBe(true);
  });
  it("Same Ref", () => {
    const state1 = StateValues.person;
    const state2 = StateValues.person;
    expect(shallowEqual(state1, state2)).toBe(true);
  });
  it("Same Ref, change value", () => {
    const state1 = StateValues.person;
    const state2 = StateValues.person;
    state2.name = "Ben";
    expect(shallowEqual(state1, state2)).toBe(true);
  });
  it("Same Ref, Different reference, same value", () => {
    const state1 = StateValues.person;
    const state2 = structuredClone(StateValues.person);
    expect(shallowEqual(state1, state2)).toBe(false);
  });
  it("Shallow copy", () => {
    const state1 = StateValues.person;
    const state2 = { ...StateValues.person };
    expect(shallowEqual(state1, state2)).toBe(true);
  });
  it("Shallow copy, added new prop", () => {
    const state1 = StateValues.person;
    const state2 = { ...StateValues.person, foo: "foo" };
    expect(shallowEqual(state1, state2)).toBe(false);
  });
});

describe("Test shallow check function from Shallow module for arrays", () => {
  it("Initial check", () => {
    expect(shallowEqual(StateValues.list, StateValues.list)).toBe(true);
  });
  it("Same Ref", () => {
    const state1 = StateValues.list;
    const state2 = StateValues.list;
    expect(shallowEqual(state1, state2)).toBe(true);
  });
  it("Same Ref, change value", () => {
    const state1 = StateValues.list;
    const state2 = StateValues.list;
    state2.push("Ben");
    expect(shallowEqual(state1, state2)).toBe(true);
  });
  it("Same Ref, Different reference, same value", () => {
    const state1 = StateValues.list;
    const state2 = structuredClone(StateValues.list);
    expect(shallowEqual(state1, state2)).toBe(true);
  });
  it("Shallow copy", () => {
    const state1 = StateValues.list;
    const state2 = [...StateValues.list];
    expect(shallowEqual(state1, state2)).toBe(true);
  });
  it("Shallow copy, added new prop", () => {
    const state1 = StateValues.list;
    const state2 = [...StateValues.list, "foo"];
    expect(shallowEqual(state1, state2)).toBe(false);
  });
});
