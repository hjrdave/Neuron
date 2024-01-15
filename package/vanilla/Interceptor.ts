/**
 * Intercepts Payloads and runs middleware on them.
 */
import type { IPayload as Payload } from "./Payload";
import type { IModule as Module } from "./Module";
import {
  Features,
  InterceptorTypes,
  StoreProps,
  StateType,
  DataProps,
} from "./Interfaces";

export interface Params<T = StateType, S = StoreProps, D = DataProps> {
  payload: Payload<T, S, D>;
  modules: Map<string, Module<StateType, S>>;
}
export interface IInterceptor {
  readonly isStateNotPrevState_PrimitiveCheckOnly: () => boolean;
  readonly isStateNotNullOrUndefined: () => boolean;
  readonly onload: () => void;
  readonly onRun: () => void;
  readonly onCallback: () => void;
}
export default class Interceptor<T, S, D> implements IInterceptor {
  private payload: Payload<T, S, D>;
  private features?: Features<T, S>;
  private modules?: Map<string, Module<StateType, S>>;
  private runModules = (type: InterceptorTypes) =>
    this.modules?.forEach((module) =>
      module[type]?.(this.payload as Payload<StateType, S>)
    );
  private runFeatures = (type: InterceptorTypes) =>
    this.features?.[type]?.(this.payload as Payload<T, S>);

  readonly isStateNotPrevState_PrimitiveCheckOnly = () =>
    this.payload.prevState !== this.payload.state;
  readonly isStateNotNullOrUndefined = () =>
    this.payload.state !== undefined && this.payload.state !== null;
  readonly onload = () => (
    this.runModules(InterceptorTypes.OnLoad),
    this.runFeatures(InterceptorTypes.OnLoad)
  );
  readonly onRun = () => (
    this.runModules(InterceptorTypes.OnRun),
    this.runFeatures(InterceptorTypes.OnRun)
  );
  readonly onCallback = () => (
    this.runModules(InterceptorTypes.onCallback),
    this.runFeatures(InterceptorTypes.onCallback)
  );

  constructor(params: Params<T, S, D>) {
    this.payload = params.payload;
    this.modules = params.modules;
    this.features = params.payload.features;
  }
}
