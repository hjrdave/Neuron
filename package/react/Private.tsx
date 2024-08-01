import React from "react";
import type { UseDispatch } from "./useDispatch";
import type { UseNeuron } from "./useNeuron";

interface ContextProps<S, A> {
  useNeuron: UseNeuron<S, A>;
  useDispatch: UseDispatch<S, A>;
}
interface Props<S, A> {
  children?: React.ReactNode;
  context: React.Context<ContextProps<S, A>>;
  useNeuron: UseNeuron<S, A>;
  useDispatch: UseDispatch<S, A>;
}

export function Private<S, A>({
  children,
  context: Context,
  useNeuron,
  useDispatch,
}: Props<S, A>) {
  const [contextProps] = React.useState<ContextProps<S, A>>({
    useNeuron,
    useDispatch,
  });

  return (
    <>
      <Context.Provider value={contextProps}>{children}</Context.Provider>
    </>
  );
}
