import { NeuronMiddleware } from "./Neuron";

export class Module<F> implements IModule<F> {
  readonly name: string;
  readonly onInit?: NeuronMiddleware<unknown, F>;
  readonly onDispatch?: NeuronMiddleware<unknown, F>;
  readonly onCallback?: NeuronMiddleware<unknown, F>;
  constructor(options: ModuleOptions<F>) {
    this.name = options.name;
    this.onInit = options.onInit;
    this.onDispatch = options.onDispatch;
    this.onCallback = options.onCallback;
  }
}

//Module Types and Interfaces
export interface IModule<F> {
  readonly name: Readonly<string>;
  onInit?: NeuronMiddleware<unknown, F>;
  onDispatch?: NeuronMiddleware<unknown, F>;
  onCallback?: NeuronMiddleware<unknown, F>;
}
export interface ModuleOptions<F> {
  name: string;
  onInit?: NeuronMiddleware<unknown, F>;
  onDispatch?: NeuronMiddleware<unknown, F>;
  onCallback?: NeuronMiddleware<unknown, F>;
}
