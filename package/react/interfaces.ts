import { DispatchMutator, Payload as IPayload, Store } from "../vanilla";
export type ClientStore = Store<NeuronState, unknown>;
export type NeuronState<T = unknown> = { [key: string | number]: T };
export type Payload<T> = IPayload<NeuronState<T>, unknown, string | number>;
export type Dispatch<T> = (mutator: (payload: Payload<T>) => void) => void;
export interface Features<T, A> {
  key?: string | number;
  actions?: (dispatch: Dispatch<T>) => A;
  onLoad?: DispatchMutator<NeuronState<T>, A, keyof NeuronState<T>>;
  onRun?: DispatchMutator<NeuronState<T>, A, keyof NeuronState<T>>;
  onCallback?: DispatchMutator<NeuronState<T>, A, keyof NeuronState<T>>;
}
