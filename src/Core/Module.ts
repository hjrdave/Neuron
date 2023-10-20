import {IPayload as Payload} from "./Payload";
import { DataProps, StateType, StoreProps, DispatchMutator } from "./Core.interfaces";

export interface Params<T = StateType, S = StoreProps, D = DataProps> {
    name: string,
    onLoad?: DispatchMutator<T, S, D>;
    onRun?: DispatchMutator<T, S, D>;
    onCallback?: DispatchMutator<T, S, D>; 
}

export interface IModule<T = StateType, S = StoreProps, D = DataProps>{
    readonly name: string;
    readonly onLoad?: DispatchMutator<T, S, D>;
    readonly onRun?: DispatchMutator<T, S, D>;
    readonly onCallback?: DispatchMutator<T, S, D>;
}
export default class Module<T = StateType, S = StoreProps, D = DataProps> implements IModule<T, S, D>{

    readonly name: string;
    private featureOnLoad?: DispatchMutator<T, S, D>;
    private featureOnRun?: DispatchMutator<T, S, D>;
    private featureOnCallback?: DispatchMutator<T, S, D>;

    readonly onLoad = (payload:Payload<T, S, D>) => (this.featureOnLoad?.(payload))
    readonly onRun = (payload: Payload<T, S, D>) => (this.featureOnRun?.(payload))
    readonly onCallback = (payload: Payload<T, S, D>) => (this.featureOnCallback?.(payload))
    
    constructor(params: Params<T, S, D>) {
        this.name = params.name;
        this.featureOnLoad = params?.onLoad;
        this.featureOnRun = params?.onRun;
        this.featureOnCallback = params?.onCallback;
    }
};


