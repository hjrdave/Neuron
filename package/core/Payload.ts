import { NeuronKey } from "./Neuron";

export class Payload<T, F> implements IPayload<T, F> {
  readonly key: NeuronKey;
  readonly prevState: Readonly<T>;
  state: T;
  readonly features?: F;
  #dispatchCancelled = false;
  readonly cancelDispatch = () => {
    this.#dispatchCancelled = true;
  };
  readonly isDispatchCancelled = () => this.#dispatchCancelled;
  constructor(options: PayloadParams<T, F>) {
    this.key = options.key;
    this.prevState = options.prevState;
    this.state = options.state;
    this.features = options.features;
  }
}

/**
 * Interface for a Payload object, which contains the data necessary for updating state
 * and running middleware during state transitions.
 *
 * @template T - The type of the state being managed.
 * @template F - The type of additional features or metadata associated with the payload.
 */
export interface IPayload<T = unknown, F = { [key: string]: unknown }> {
  /**
   * The unique key associated with the Neuron state.
   */
  readonly key: Readonly<NeuronKey>;

  /**
   * The current state of the Neuron.
   */
  state: T;

  /**
   * The previous state of the Neuron.
   */
  readonly prevState: Readonly<T>;

  /**
   * Optional additional features or metadata associated with the payload.
   */
  readonly features?: Readonly<F>;

  /**
   * Cancels the dispatch operation for the current payload.
   */
  readonly cancelDispatch: () => void;

  /**
   * Checks if the dispatch operation for the current payload has been canceled.
   *
   * @returns `true` if the dispatch is canceled; otherwise `false`.
   */
  readonly isDispatchCancelled: () => boolean;
}

/**
 * Parameters for creating a new Payload instance.
 *
 * @template T - The type of the state being managed.
 * @template F - The type of additional features or metadata associated with the payload.
 */
export interface PayloadParams<T, F> {
  /**
   * The unique key associated with the Neuron state.
   */
  key: NeuronKey;

  /**
   * The previous state of the Neuron.
   */
  prevState: T;

  /**
   * The current state of the Neuron.
   */
  state: T;

  /**
   * Optional additional features or metadata to associate with the payload.
   */
  features?: F;
}
