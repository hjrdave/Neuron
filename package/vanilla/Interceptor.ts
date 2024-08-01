/**
 * Intercepts Payloads and runs middleware on them.
 */
import type { IPayload as Payload } from "./Payload";
import type { IModule as Module } from "./Module";
import { Features, InterceptorTypes } from "./Interfaces";

export interface Params<S, A, SelectorKey extends keyof S> {
  payload: Payload<S, A, SelectorKey>;
  modules: Map<string, Module<S, A>>;
}
export interface IInterceptor {
  readonly isStateNotPrevState_PrimitiveCheckOnly: Readonly<() => boolean>;
  readonly isStateNotNullOrUndefined: Readonly<() => boolean>;
  readonly onload: Readonly<() => void>;
  readonly onRun: Readonly<() => void>;
  readonly onCallback: Readonly<() => void>;
}
export class Interceptor<S, A, SelectorKey extends keyof S>
  implements IInterceptor
{
  private payload: Payload<S, A, SelectorKey>;
  private features?: Features<S, A, SelectorKey>;
  private modules?: Map<string, Module<S, A>>;
  private runModules = (type: InterceptorTypes) =>
    this.modules?.forEach((module) => module[type]?.(this.payload));
  private runFeatures = (type: InterceptorTypes) =>
    this.features?.[type]?.(this.payload);

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

  constructor(params: Params<S, A, SelectorKey>) {
    this.payload = params.payload;
    this.modules = params.modules;
    this.features = params.payload.features;
  }
}
