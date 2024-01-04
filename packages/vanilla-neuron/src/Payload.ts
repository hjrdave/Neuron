/**
 * This class hold data necessary for updating state and running middleware.
 */
import {
  SelectorKey,
  Features,
  StateType,
  StoreProps,
  DataProps,
  GetState,
  SetState,
  GetStore,
  ResetState,
} from "./Interfaces";
export interface Params<T = StateType, S = StoreProps, D = DataProps> {
  key: SelectorKey<S>;
  prevState: T;
  state: T;
  features?: Features<T, S>;
  data?: D;
  get: GetState<S>;
  set: SetState<S>;
  reset: ResetState<S>;
  getStore: GetStore<unknown, S>;
}

export interface IPayload<T = StateType, S = StoreProps, D = DataProps> {
  readonly key: SelectorKey<S>;
  readonly features?: Features<T, S>;
  readonly prevState: T;
  state: T;
  data?: D;
  readonly get: GetState<S>;
  readonly set: SetState<S>;
  readonly reset: ResetState<S>;
  readonly getStore: GetStore<unknown, S>;
  readonly cancelDispatch: () => void;
  readonly isDispatchCancelled: () => boolean;
}

export default class Payload<T = StateType, S = StoreProps, D = DataProps>
  implements IPayload<T, S, D>
{
  readonly key: SelectorKey<S>;
  readonly features?: Features<T, S>;
  readonly prevState: T;
  state: T;
  data?: D;
  private dispatchCancelled = false;
  readonly get: GetState<S>;
  readonly set: SetState<S>;
  readonly reset: ResetState<S>;
  readonly getStore: GetStore<unknown, S>;
  readonly cancelDispatch = () => {
    this.dispatchCancelled = true;
  };
  readonly isDispatchCancelled = () => this.dispatchCancelled;

  constructor(params: Params<T, S, D>) {
    this.key = params.key;
    this.prevState = params.prevState;
    this.state = params.state;
    this.data = params.data;
    this.features = params.features;
    this.get = params.get;
    this.set = params.set;
    this.reset = params.reset;
    this.getStore = params.getStore;
  }
}
