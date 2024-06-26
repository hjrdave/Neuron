import type { IPayload as Payload } from "./Payload";
import type { DispatchMutator } from "./Interfaces";

export interface Params<S, A> {
  name: string;
  onLoad?: DispatchMutator<S, A>;
  onRun?: DispatchMutator<S, A>;
  onCallback?: DispatchMutator<S, A>;
}

export interface IModule<S, A> {
  readonly name: string;
  readonly onLoad?: DispatchMutator<S, A>;
  readonly onRun?: DispatchMutator<S, A>;
  readonly onCallback?: DispatchMutator<S, A>;
}
export class Module<S, A> implements IModule<S, A> {
  readonly name: string;
  private featureOnLoad?: DispatchMutator<S, A>;
  private featureOnRun?: DispatchMutator<S, A>;
  private featureOnCallback?: DispatchMutator<S, A>;

  readonly onLoad = <SelectorKey extends keyof S>(
    payload: Payload<S, A, SelectorKey>
  ) => this.featureOnLoad?.(payload);
  readonly onRun = <SelectorKey extends keyof S>(
    payload: Payload<S, A, SelectorKey>
  ) => this.featureOnRun?.(payload);
  readonly onCallback = <SelectorKey extends keyof S>(
    payload: Payload<S, A, SelectorKey>
  ) => this.featureOnCallback?.(payload);

  constructor(params: Params<S, A>) {
    this.name = params.name;
    this.featureOnLoad = params?.onLoad;
    this.featureOnRun = params?.onRun;
    this.featureOnCallback = params?.onCallback;
  }
}
