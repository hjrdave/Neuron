import React from "react";
import type { Store, SelectorKey, Actions, DispatchMutator } from "../vanilla";
import type { ActionProps } from "../vanilla/Interfaces";

export interface StateProps<
  T = unknown,
  A = ActionProps,
  S = { [key: string]: unknown }
> {
  name: SelectorKey<S>;
  state: T;
  actions?: Actions<A, T, S>;
  onLoad?: DispatchMutator<T, S>;
  onRun?: DispatchMutator<T, S>;
  onCallback?: DispatchMutator<T, S>;
}
interface Props<T = unknown, A = ActionProps, S = { [key: string]: unknown }>
  extends StateProps<T, A, S> {
  Store: Store<S>;
}

export function State<
  T = unknown,
  A = ActionProps,
  S = { [key: string]: unknown },
  M = unknown
>({
  name,
  state,
  onLoad,
  onRun,
  onCallback,
  actions,
  Store,
  ...moduleFeatures
}: Props<T, A, S> & M) {
  Store.add<T, A>({
    key: name,
    state: state,
    actions: actions,
    features: {
      onLoad: onLoad,
      onRun: onRun,
      onCallback: onCallback,
      ...moduleFeatures,
    },
  });

  return <React.Fragment></React.Fragment>;
}
