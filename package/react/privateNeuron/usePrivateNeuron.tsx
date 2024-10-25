import { useContext } from "react";
import { createStore } from "../../vanilla";
import { default as PrivateComp } from "./Private";
import { IContext } from "./PrivateNeuronClient";

export interface Options {
  name?: string;
}
const usePrivateNeuron = (
  Context: React.Context<IContext>,
  options?: Options
) => {
  const connect = createStore({ name: options?.name });
  const ContextValue = {
    store: connect,
  };
  const Private = (props: { children: React.ReactNode }) => (
    <PrivateComp context={Context} value={ContextValue}>
      {props.children}
    </PrivateComp>
  );
  return { Private, connect };
};
export default usePrivateNeuron;
