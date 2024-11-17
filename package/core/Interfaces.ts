export interface INeuronClient {
  readonly name: ClientName;
  readonly has: (key: NeuronKey) => boolean;
  readonly getRef: <T>(key: NeuronKey) => T;
  readonly getSnapshot: () => {
    key: NeuronKey;
    state: unknown;
  }[];
  readonly listen: (callbackfn: DispatchCallback<unknown>) => void;
  readonly dispatch: <T>(key: NeuronKey, mutator: DispatchMutator<T>) => void;
  readonly connect: () => void;
  readonly init: <T>(
    initialState: T,
    options: NeuronInitOptions<T>
  ) => INeuron<T>;
}
export interface NeuronInitOptions<T> {
  key: NeuronKey;
  actions: (mutator: DispatchMutator<T>) => { [key: string]: unknown };
  onInit: (payload: IPayload<T>) => void;
  onRun: (payload: IPayload<T>) => void;
  onCallback: (payload: IPayload<T>) => void;
}
export interface ClientOptions {
  name?: NeuronKey;
  modules?: IModule[];
}

export interface INeuron<T> {
  readonly key: NeuronKey;
  readonly set: (newState: T) => void;
  readonly dispatch: (mutator: DispatchMutator<T>) => void;
  readonly getClone: () => T;
  readonly getRef: () => T;
  readonly effect: (callbackFn: DispatchCallback<T>) => void;
}

export type ClientName = string | number;
export type NeuronKey = string | number;
export interface NeuronData<T> {
  key: NeuronKey;
  state?: T;
  prevState?: T;
  actions?: (mutator: DispatchMutator<T>) => { [key: string]: unknown };
  onInit?: (payload: IPayload<T>) => void;
  onRun?: (payload: IPayload<T>) => void;
  onCallback?: (payload: IPayload<T>) => void;
}
export type DispatchMutator<T> = (payload: IPayload<T>) => IPayload<T>;
export type DispatchCallback<T> = (payload: IPayload<T>) => void;

export interface IPayload<T> {
  readonly key: Readonly<NeuronKey>;
  readonly prevState?: Readonly<T>;
  state?: T;
  readonly cancelDispatch: () => void;
  readonly isDispatchCancelled: () => boolean;
}

export interface PayloadOptions<T> {
  key: NeuronKey;
  prevState: Readonly<T>;
  state: T;
}

export interface IModule {
  readonly name: string;
  onInit?: (payload: IPayload<unknown>) => void;
  onRun?: (payload: IPayload<unknown>) => void;
  onCallback?: (payload: IPayload<unknown>) => void;
}
export interface ModuleOptions {
  name: string;
  onInit?: (payload: IPayload<unknown>) => void;
  onRun?: (payload: IPayload<unknown>) => void;
  onCallback?: (payload: IPayload<unknown>) => void;
}

export interface IDispatcher<T> {
  listen: (key: NeuronKey, callbackfn: DispatchCallback<T>) => void;
  stopListening: (key: NeuronKey) => void;
  dispatch: (payload: IPayload<T>) => void;
}
