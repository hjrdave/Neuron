/**
 * This class hold data necessary for updating state and running middleware.
 */
import { IPayload, PayloadOptions, NeuronKey } from "./Interfaces";

export class Payload<T> implements IPayload<T> {
  readonly key: NeuronKey;
  readonly prevState: Readonly<T>;
  state: T;
  private dispatchCancelled = false;
  readonly cancelDispatch = () => {
    this.dispatchCancelled = true;
  };
  readonly isDispatchCancelled = () => this.dispatchCancelled;

  constructor(options: PayloadOptions<T>) {
    this.key = options.key;
    this.prevState = options.prevState;
    this.state = options.state;
  }
}
