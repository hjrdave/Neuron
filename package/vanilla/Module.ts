import type { IPayload as Payload } from "./Payload";
import type {
  DataProps,
  StateType,
  StoreProps,
  DispatchMutator,
} from "./Interfaces";

export interface Params<T = StateType, S = StoreProps, D = DataProps> {
  name: string;
  onLoad?: DispatchMutator<T, S, D>;
  onRun?: DispatchMutator<T, S, D>;
  onCallback?: DispatchMutator<T, S, D>;
}

export interface IModule<T = StateType, S = StoreProps, D = DataProps> {
  readonly name: string;
  readonly onLoad?: DispatchMutator<T, S, D>;
  readonly onRun?: DispatchMutator<T, S, D>;
  readonly onCallback?: DispatchMutator<T, S, D>;
}
export class Module<T, S, D> implements IModule<T, S, D> {
  readonly name: string;
  private featureOnLoad?: DispatchMutator<T, S, D>;
  private featureOnRun?: DispatchMutator<T, S, D>;
  private featureOnCallback?: DispatchMutator<T, S, D>;

  readonly onLoad = (payload: Payload<T, S, D>) =>
    this.featureOnLoad?.(payload);
  readonly onRun = (payload: Payload<T, S, D>) => this.featureOnRun?.(payload);
  readonly onCallback = (payload: Payload<T, S, D>) =>
    this.featureOnCallback?.(payload);

  constructor(params: Params<T, S, D>) {
    this.name = params.name;
    this.featureOnLoad = params?.onLoad;
    this.featureOnRun = params?.onRun;
    this.featureOnCallback = params?.onCallback;
  }
}
