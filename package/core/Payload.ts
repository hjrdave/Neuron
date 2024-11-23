import { NeuronKey } from "./Neuron";

/**
 * This class hold data necessary for updating state and running middleware.
 */
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

//Payload Types and Interfaces
export interface IPayload<T = unknown, F = { [key: string]: unknown }> {
  readonly key: Readonly<NeuronKey>;
  state: T;
  readonly prevState: Readonly<T>;
  readonly features?: Readonly<F>;
  readonly cancelDispatch: () => void;
  readonly isDispatchCancelled: () => boolean;
}
export interface PayloadParams<T, F> {
  key: NeuronKey;
  prevState: T;
  state: T;
  features?: F;
}
