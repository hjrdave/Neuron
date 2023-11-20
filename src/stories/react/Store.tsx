import React from "react";
import Neuron from "../../react";
import Persist, { PersistProps } from "../../modules/persist";

interface IState {
  fruit: string;
  carList: string[];
  isLoading: boolean;
  person: {
    name: string;
    gender: string;
    jobTitle: string;
  };
  score: number;
  userName: string;
}

interface Person {
  name: string;
  gender: string;
  jobTitle: string;
}

export interface ScoreActions {
  increment: () => void;
  decrement: () => void;
}

const { State, Module, ..._Store } = Neuron.Store<IState, PersistProps>();

export const useNeuron = _Store.useNeuron;

export default function Store() {
  return (
    <>
      <Module use={Persist} />
      <State<string> name={"fruit"} state={"apple"} />
      <State<string[]> name={"carList"} state={["toyota", "ford", "chevy"]} />
      <State<boolean> name={"isLoading"} state={false} />
      <State<Person>
        name={"person"}
        state={{
          name: "Bob",
          gender: "male",
          jobTitle: "Developer",
        }}
      />
      {/**Persisted State */}
      <State<number, ScoreActions>
        name={"score"}
        state={1000}
        actions={(dispatch) => ({
          increment: () =>
            dispatch((payload) => {
              payload.state = payload.prevState + 10;
            }),
          decrement: () =>
            dispatch((payload) => {
              payload.state = payload.prevState - 10;
            }),
        })}
      />
      <State<string> name={"userName"} state={"Captain Foo"} />
    </>
  );
}
