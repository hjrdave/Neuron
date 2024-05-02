/**
 * This class hold data necessary for updating state and running middleware.
 */
import type {
  SelectorKey,
  Features,
  StateType,
  StoreProps,
  DataProps,
  GetState,
  SetState,
  GetStore,
} from "./Interfaces";
export interface Params<T = StateType, S = StoreProps, D = DataProps> {
  key: SelectorKey<S>;
  prevState: T;
  state: T;
  features?: Features<T, S>;
  data?: D;
  get: GetState<S>;
  set: SetState<S>;
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
  readonly getStore: GetStore<unknown, S>;
  readonly cancelDispatch: () => void;
  readonly isDispatchCancelled: () => boolean;
}

export class Payload<T = StateType, S = StoreProps, D = DataProps>
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
  readonly getStore: GetStore<unknown, S>;
  readonly cancelDispatch = () => {
    this.dispatchCancelled = true;
  };
  readonly isDispatchCancelled = () => this.dispatchCancelled;

  constructor(params: Params<T, S, D>) {
    this.key = params.key;
    this.prevState = Object.freeze(params.prevState);
    this.state = structuredClone?.(params.state) ?? params.state;
    this.data = structuredClone?.(params.data) ?? params.data;
    this.features = Object.freeze(params.features);
    this.get = Object.freeze(params.get);
    this.set = Object.freeze(params.set);
    this.getStore = Object.freeze(params.getStore);
  }
}
