/**
 * This class hold data necessary for updating state and running middleware.
 */
import type { Features, GetState, SetState } from "./Interfaces";
export interface Params<S, A, SelectorKey extends keyof S> {
  key: SelectorKey;
  prevState: S[SelectorKey];
  state: S[SelectorKey];
  features?: Features<S, A>;
  data?: unknown;
  get: GetState<S>;
  set: SetState<S>;
}

export interface IPayload<S, A, SelectorKey extends keyof S> {
  readonly key: Readonly<SelectorKey>;
  readonly features?: Readonly<Features<S, A>>;
  readonly prevState: Readonly<S[SelectorKey]>;
  state: S[SelectorKey];
  data?: unknown;
  readonly get: GetState<S>;
  readonly set: SetState<S>;
  readonly cancelDispatch: () => void;
  readonly isDispatchCancelled: () => boolean;
}

export class Payload<S, A, SelectorKey extends keyof S>
  implements IPayload<S, A, SelectorKey>
{
  readonly key: Readonly<SelectorKey>;
  readonly features?: Readonly<Features<S, A>>;
  readonly prevState: Readonly<S[SelectorKey]>;
  state: S[SelectorKey];
  data?: unknown;
  private dispatchCancelled = false;
  readonly get: GetState<S>;
  readonly set: SetState<S>;
  readonly cancelDispatch = () => {
    this.dispatchCancelled = true;
  };
  readonly isDispatchCancelled = () => this.dispatchCancelled;

  constructor(params: Params<S, A, SelectorKey>) {
    this.key = params.key;
    this.prevState = params.prevState;
    this.state = params.state;
    this.data = params.data;
    this.features = params.features;
    this.get = params.get;
    this.set = params.set;
  }
}
