import React from "react";
import type { UseDispatch } from "./useDispatch";
import type { UseNeuron } from "./useNeuron";

interface ContextProps<S = { [key: string]: unknown }> {
  useNeuron: UseNeuron<S>;
  useDispatch: UseDispatch<S>;
}
interface Props<S = { [key: string]: unknown }> {
  children?: React.ReactNode;
  context: React.Context<ContextProps<S>>;
  useNeuron: UseNeuron<S>;
  useDispatch: UseDispatch<S>;
}

export function Private<S = { [key: string]: unknown }>({
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
