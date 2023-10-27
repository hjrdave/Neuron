import {IPayload as Payload} from "./Payload";
import { IModule as Module } from "./Module";

export enum InterceptorTypes {
    OnLoad = 'onLoad',
    OnRun = 'onRun',
    onCallback = 'onCallback'
}

export type Props = {[key:string]: unknown};

export type StoreProps = Props;

export type ActionProps = Props;

export type DataProps = Props;

export type StateType = unknown;

export type SelectorKey<S = StoreProps> = keyof S;

export type Actions<A = ActionProps, T = StateType, S = StoreProps> = (dispatch: (mutator: DispatchMutator<T, S>) => void) => A;

export type DispatchMutator <T = StateType, S = StoreProps, D = DataProps> =  (payload: Payload<T, S, D>) => void;

export type DispatchCallback<S = StoreProps> = DispatchMutator<unknown, S>;

export type DispatchPayload<S = StoreProps> =  <T = StateType>(key: SelectorKey<S>, mutator: DispatchMutator<T, S>) => void;

export type OnDispatch<S = StoreProps> = (callback: DispatchCallback<S>) => void;

export type AddState<S = StoreProps, A = ActionProps> = <T = StateType>(storeItem: StoreItem<T, S, A>) => void

export type GetState<S = StoreProps> = <T = StateType>(selector: SelectorKey<S>) => T;

export type SetState<S = StoreProps> = <T = StateType>(selector: SelectorKey<S>, newState: T | ((prevState: T) => T)) => void;

export type GetStore<T = StateType, S = StoreProps, A = ActionProps> = () => StoreItem<T, S, A>[];

export type HasState<S = StoreProps> = (key: SelectorKey<S>) => boolean;

export type ResetState<S = StoreProps> = (key?: SelectorKey<S>) => void;

export type UseModule<S = StoreProps> = (module: Module<StateType, S>) => void;

export type GetActions<S = StoreProps> = <A = ActionProps>(selector: SelectorKey<S>) => A

export interface StoreItem<T = StateType, S = StoreProps, A = ActionProps> {
    key: SelectorKey<S>;
    state?: T;
    actions?: Actions<A, T, S>;
    features?: Features<T, S>;
}

export interface Features<T = unknown, S = Props> {
    onLoad?: DispatchMutator<T, S>;
    onRun?: DispatchMutator<T, S>;
    onCallback?: DispatchMutator<T, S>;
}