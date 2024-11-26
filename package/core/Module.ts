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

/**
 * Interface representing a module that provides lifecycle methods for interacting with Neuron state.
 *
 * @template F - The type of additional features or metadata associated with the module.
 */
export interface IModule<F> {
  /**
   * The name of the module.
   */
  readonly name: Readonly<string>;

  /**
   * Optional lifecycle method invoked during the initialization of a Neuron.
   *
   * @param payload - The payload containing state and metadata during initialization.
   */
  onInit?: NeuronMiddleware<unknown, F>;

  /**
   * Optional lifecycle method invoked during the dispatch of a Neuron state change.
   *
   * @param payload - The payload containing the updated state and metadata.
   */
  onDispatch?: NeuronMiddleware<unknown, F>;

  /**
   * Optional lifecycle method invoked after a Neuron state change has been completed.
   *
   * @param payload - The payload containing the final state and metadata.
   */
  onCallback?: NeuronMiddleware<unknown, F>;
}

/**
 * Options for configuring a `Module` instance.
 *
 * @template F - The type of additional features or metadata associated with the module.
 */
export interface ModuleOptions<F> {
  /**
   * The name of the module.
   */
  name: string;

  /**
   * Optional lifecycle method invoked during the initialization of a Neuron.
   *
   * @param payload - The payload containing state and metadata during initialization.
   */
  onInit?: NeuronMiddleware<unknown, F>;

  /**
   * Optional lifecycle method invoked during the dispatch of a Neuron state change.
   *
   * @param payload - The payload containing the updated state and metadata.
   */
  onDispatch?: NeuronMiddleware<unknown, F>;

  /**
   * Optional lifecycle method invoked after a Neuron state change has been completed.
   *
   * @param payload - The payload containing the final state and metadata.
   */
  onCallback?: NeuronMiddleware<unknown, F>;
}
