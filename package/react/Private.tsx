import React from "react";
import type { UseDispatch } from "./useDispatch";
import type { UseNeuron } from "./useNeuron";
import type { StateProps } from "./State";

interface ContextProps<S = StateProps> {
  useNeuron: UseNeuron<S>;
  useDispatch: UseDispatch<S>;
}
interface Props<S = StateProps> {
  children?: React.ReactNode;
  context: React.Context<ContextProps<S>>;
  useNeuron: UseNeuron<S>;
  useDispatch: UseDispatch<S>;
}

export function Private<S = StateProps>({
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
