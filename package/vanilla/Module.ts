import type { IPayload as Payload } from "./Payload";
import type { DataProps, DispatchMutator, StateType } from "./Interfaces";

export interface Params {
  name: string;
  onLoad?: DispatchMutator<unknown, StateType, DataProps>;
  onRun?: DispatchMutator<unknown, StateType, DataProps>;
  onCallback?: DispatchMutator<unknown, StateType, DataProps>;
}

export interface IModule {
  readonly name: string;
  readonly onLoad?: DispatchMutator<unknown, StateType, DataProps>;
  readonly onRun?: DispatchMutator<unknown, StateType, DataProps>;
  readonly onCallback?: DispatchMutator<unknown, StateType, DataProps>;
}
export class Module implements IModule {
  readonly name: string;
  private featureOnLoad?: DispatchMutator<unknown, StateType, DataProps>;
  private featureOnRun?: DispatchMutator<unknown, StateType, DataProps>;
  private featureOnCallback?: DispatchMutator<unknown, StateType, DataProps>;

  readonly onLoad = (payload: Payload<unknown, StateType, DataProps>) =>
    this.featureOnLoad?.(payload);
  readonly onRun = (payload: Payload<unknown, StateType, DataProps>) =>
    this.featureOnRun?.(payload);
  readonly onCallback = (payload: Payload<unknown, StateType, DataProps>) =>
    this.featureOnCallback?.(payload);

  constructor(params: Params) {
    this.name = params.name;
    this.featureOnLoad = params?.onLoad;
    this.featureOnRun = params?.onRun;
    this.featureOnCallback = params?.onCallback;
  }
}
