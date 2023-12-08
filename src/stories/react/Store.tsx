import React from "react";
import Neuron from "../../react";
import NeuronSync from "../../neuronsync";
// import Persist, { PersistProps } from "../../modules/persist";
import Devtools from "../../../dist/modules/devtools";

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

export const { State, Module, bridge, useNeuron, ..._Store } =
  Neuron.Store<IState>();
export const { ServerState, useNeuronSync } = NeuronSync<IState>(bridge);

export default function Store() {
  return (
    <>
      {/* <Module use={Persist} /> */}
      <Module use={Devtools({ storeName: "feeStore" })} />
      <State<string> name={"fruit"} state={"apple"} />

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
      <State<string[]> name={"carList"} state={["toyota", "ford", "chevy"]} />
    </>
  );
}
