import { IModule } from "../../vanilla/Module";
import { Store } from "../../vanilla";
import { createContext } from "react";
import { Features } from "../interfaces";
import { default as _privateNeuron } from "./privateNeuron";
import { default as _usePrivateNeuron, Options } from "./usePrivateNeuron";

export type StoreInstance = Store<
  {
    [key: string]: unknown;
  },
  {
    [key: string]: unknown;
  }
>;

export interface StoreOptions {
  name?: string | number;
  modules?: IModule[];
}
export interface IContext {
  store: StoreInstance;
}
export class PrivateNeuronClient {
  private Context: React.Context<IContext>;
  privateNeuron = <T, A = unknown>(features?: Features<T, A>) => {
    return _privateNeuron<T, A>(this.Context, features);
  };
  usePrivateNeuron = (options: Options) =>
    _usePrivateNeuron(this.Context, options);
  constructor() {
    this.Context = createContext(null) as unknown as React.Context<IContext>;
  }
}
