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

const { State, Module, ..._Store } = Neuron.Store<IState, PersistProps>();

export const useNeuron = _Store.useNeuron;

export default function Store() {
  return (
    <>
      <Module use={Persist} />
      <State
        name={"fruit"}
        state={"apple"}
        // actions={(dispatch) => ({
        //   reset: () => dispatch((payload) => payload.reset()),
        // })}
      />
      <State name={"carList"} state={["toyota", "ford", "chevy"]} />
      <State name={"isLoading"} state={false} />
      <State
        name={"person"}
        state={{
          name: "Bob",
          gender: "male",
          jobTitle: "Developer",
        }}
        actions={(dispatch) => ({
          reset: () => dispatch((payload) => payload.reset()),
        })}
      />
      {/**Persisted State */}
      <State<number, { decrement: () => void; increment: () => void }>
        name={"score"}
        state={1000}
        actions={(dispatch) => ({
          decrement: () =>
            dispatch((payload) => {
              const current = payload.state;
              if (current !== undefined) {
                payload.state = current + 1000;
              }
            }),
          increment: () =>
            dispatch((payload) => {
              const current = payload.state;
              if (current !== undefined) {
                payload.state = current - 1000;
              }
            }),
        })}
      />
      <State name={"userName"} state={"Captain Foo"} />
    </>
  );
}
