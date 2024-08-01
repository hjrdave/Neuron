import type { IPayload as Payload } from "./Payload";
import type { DispatchMutator } from "./Interfaces";

export interface Params<S, A> {
  name: string;
  onLoad?: DispatchMutator<S, A, keyof S>;
  onRun?: DispatchMutator<S, A, keyof S>;
  onCallback?: DispatchMutator<S, A, keyof S>;
}

export interface IModule<
  S = { [key: string]: unknown },
  A = { [key: string]: unknown }
> {
  readonly name: string;
  readonly onLoad?: DispatchMutator<S, A, keyof S>;
  readonly onRun?: DispatchMutator<S, A, keyof S>;
  readonly onCallback?: DispatchMutator<S, A, keyof S>;
}
export class Module<S, A> implements IModule<S, A> {
  readonly name: string;
  private featureOnLoad?: DispatchMutator<S, A, keyof S>;
  private featureOnRun?: DispatchMutator<S, A, keyof S>;
  private featureOnCallback?: DispatchMutator<S, A, keyof S>;

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
