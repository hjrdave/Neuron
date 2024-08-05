import { createStore, Payload as IPayload, Store } from "../vanilla";
import { neuron } from "./neuron";

export type ClientStore = Store<{ [key: string | number]: unknown }, unknown>;
export type Payload<T> = IPayload<
  { [key: string | number]: T },
  unknown,
  string | number
>;
export type Dispatch<T> = (mutator: (payload: Payload<T>) => void) => void;
export interface Features<T, A> {
  key?: string;
  actions?: (dispatch: Dispatch<T>) => A;
}

export class NeuronClient {
  private store: ClientStore;
  neuron = <T, A>(initialState: T, features?: Features<T, A>) =>
    neuron(this.store, initialState, features);

  constructor() {
    this.store = createStore();
  }
}
