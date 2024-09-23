import React from "react";
import { IContext } from "./PrivateNeuronClient";

interface Props {
  children?: React.ReactNode;
  context: React.Context<IContext>;
  value: IContext;
}

export default function Private({ children, context: Context, value }: Props) {
  return (
    <>
      <Context.Provider value={value}>{children}</Context.Provider>
    </>
  );
}
