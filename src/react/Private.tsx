import React from "react";
import { UseDispatch } from "./useDispatch";
import { UseNeuron } from "./useNeuron";

interface ContextProps<S = { [key: string]: any }> {
  useNeuron: UseNeuron<S>;
  useDispatch: UseDispatch<S>;
}
interface Props<S = { [key: string]: any }> {
  children?: React.ReactNode;
  context: React.Context<ContextProps<S>>;
  useNeuron: UseNeuron<S>;
  useDispatch: UseDispatch<S>;
}

export default function Private<S = { [key: string]: any }>({
  children,
  context: Context,
  useNeuron,
  useDispatch,
}: Props<S>) {
  const [contextProps] = React.useState<ContextProps<S>>({
    useNeuron,
    useDispatch,
  });

  return (
    <>
      <Context.Provider value={contextProps}>{children}</Context.Provider>
    </>
  );
}
