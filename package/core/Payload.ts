import { NeuronKey } from "./Neuron";

export class Payload<T> implements IPayload<T> {
  readonly key: NeuronKey;
  readonly prevState: Readonly<T>;
  state: T;
  #dispatchCancelled = false;
  readonly cancelDispatch = () => {
    this.#dispatchCancelled = true;
  };
  readonly isDispatchCancelled = () => this.#dispatchCancelled;
  constructor(options: PayloadParams<T>) {
    this.key = options.key;
    this.prevState = options.prevState;
    this.state = options.state;
  }
}

/**
 * Interface for a Payload object, which contains the data necessary for updating state
 * and running middleware during state transitions.
 *
 * @template T - The type of the state being managed.
 */
export interface IPayload<T = unknown> {
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
 */
export interface PayloadParams<T> {
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
}
