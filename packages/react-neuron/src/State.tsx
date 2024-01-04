import React from "react";
import {
  Store,
  SelectorKey,
  Actions,
  DispatchMutator,
} from "../../vanilla-neuron/vanilla-neuron/src";

export interface StateProps<
  T = unknown,
  A = { [key: string]: unknown },
  S = { [key: string]: unknown }
> {
  name: SelectorKey<S>;
  state: T;
  actions?: Actions<A, T, S>;
  onLoad?: DispatchMutator<T, S>;
  onRun?: DispatchMutator<T, S>;
  onCallback?: DispatchMutator<T, S>;
}
interface Props<
  T = unknown,
  A = { [key: string]: unknown },
  S = { [key: string]: unknown }
> extends StateProps<T, A, S> {
  Store: Store<S>;
}

export default function State<
  T = unknown,
  A = { [key: string]: unknown },
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
