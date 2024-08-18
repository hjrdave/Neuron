import { createStore } from "../vanilla";
import { IModule } from "../vanilla/Module";
import { ClientStore, Features } from "./interfaces";
import { neuron } from "./neuron";

export interface StoreOptions {
  modules?: IModule[];
}

export class NeuronClient {
  private store: ClientStore;
  neuron = <T, A>(initialState: T, features?: Features<T, A>) =>
    neuron<T, A>(this.store, initialState, features);

  constructor(options?: StoreOptions) {
    this.store = createStore(options);
  }
}
