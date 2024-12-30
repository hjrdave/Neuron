import { NeuronMiddleware } from "./Neuron";

export class Module implements IModule {
  readonly name: string;
  readonly onInit?: NeuronMiddleware<unknown>;
  readonly onDispatch?: NeuronMiddleware<unknown>;
  readonly onCallback?: NeuronMiddleware<unknown>;
  constructor(options: ModuleOptions) {
    this.name = options.name;
    this.onInit = options.onInit;
    this.onDispatch = options.onDispatch;
    this.onCallback = options.onCallback;
  }
}

/**
 * Interface representing a module that provides lifecycle methods for interacting with Neuron state.
 */
export interface IModule {
  /**
   * The name of the module.
   */
  readonly name: Readonly<string>;

  /**
   * Optional lifecycle method invoked during the initialization of a Neuron.
   *
   * @param payload - The payload containing state and metadata during initialization.
   */
  onInit?: NeuronMiddleware<unknown>;

  /**
   * Optional lifecycle method invoked during the dispatch of a Neuron state change.
   *
   * @param payload - The payload containing the updated state and metadata.
   */
  onDispatch?: NeuronMiddleware<unknown>;

  /**
   * Optional lifecycle method invoked after a Neuron state change has been completed.
   *
   * @param payload - The payload containing the final state and metadata.
   */
  onCallback?: NeuronMiddleware<unknown>;
}

/**
 * Options for configuring a `Module` instance.
 */
export interface ModuleOptions {
  /**
   * The name of the module.
   */
  name: string;

  /**
   * Optional lifecycle method invoked during the initialization of a Neuron.
   *
   * @param payload - The payload containing state and metadata during initialization.
   */
  onInit?: NeuronMiddleware<unknown>;

  /**
   * Optional lifecycle method invoked during the dispatch of a Neuron state change.
   *
   * @param payload - The payload containing the updated state and metadata.
   */
  onDispatch?: NeuronMiddleware<unknown>;

  /**
   * Optional lifecycle method invoked after a Neuron state change has been completed.
   *
   * @param payload - The payload containing the final state and metadata.
   */
  onCallback?: NeuronMiddleware<unknown>;
}
