import { expect, test } from "vitest";
import { createStore } from "../vanilla";
import { Slices, getSlice, setSlice, convertSelector } from "./slices";

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
}
enum StateKeys {
  Person = "person",
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
};
const Store = createStore<State>();

Store.use(Slices);

Store.add<typeof StateValues.person>({
  key: StateKeys.Person,
  state: StateValues.person,
});

test("Can get non slice.", () => {
  const person = getSlice<Person, State>((store) => store.person, Store);
  expect(person.name).toBe(StateValues.person.name);
});
test("Get Person data slice.", () => {
  expect(Store.has(StateKeys.Person)).toBeTruthy();
  expect(getSlice((store) => store.person.name, Store)).toBe(
    StateValues.person.name
  );
  expect(getSlice((store) => store.person.age, Store)).toBe(
    StateValues.person.age
  );
  expect(getSlice((store) => store.person.job.salary, Store)).toBe(
    StateValues.person.job.salary
  );
});
test("set Person data slice.", () => {
  expect(Store.has(StateKeys.Person)).toBeTruthy();

  setSlice((store) => store.person.name, "Bill", Store);
  setSlice((store) => store.person.job.salary, 100000, Store);
  setSlice((store) => store.person.age, 55, Store);

  expect(getSlice((store) => store.person.name, Store)).toBe("Bill");
  expect(getSlice((store) => store.person.age, Store)).toBe(55);
  expect(getSlice((store) => store.person.job.salary, Store)).toBe(100000);
});
test("Can set non slice.", () => {
  const updatedPerson = {
    name: "Fooman",
    age: 350,
    job: {
      company: "Google",
      salary: 1000,
    },
  };
  const selector = convertSelector<State>((store) => store.person);
  Store.set(selector.key, updatedPerson);
  const person = Store.get<Person>(selector.key);
  expect(person.name).toBe(updatedPerson.name);
  expect(person.age).toBe(updatedPerson.age);
  expect(person.job.company).toBe(updatedPerson.job.company);
  expect(person.job.salary).toBe(updatedPerson.job.salary);
});
