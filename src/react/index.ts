import {default as ReactStore} from './Store';
import {default as ReactPrivateStore} from './PrivateStore';
import {Module} from '@neurongsm/core';
import Slices from '@neurongsm/slices';


const DefaultModules = [Slices] as any[];
namespace NeuronGSM{
    export function Store<S = {[key:string]: unknown}, M=unknown>(options?: {modules?: Module<unknown, S>[]}){
        const modules = options?.modules ?? [];
        return new ReactStore<S, M>({...options, modules: [...DefaultModules, ...modules]});
    }

    export function PrivateStore<S = {[key:string]: unknown}, M=unknown>(options?: {modules?: Module<unknown, S>[]}){
        const modules = options?.modules ?? [];
        return new ReactPrivateStore<S, M>({...options, modules: [...DefaultModules, ...modules]});
    }
}

export function Store<S = {[key:string]: unknown}, M=unknown>(options?: {modules?: Module<unknown, S>[]}){
    const modules = options?.modules ?? [];
    return new ReactStore<S, M>({...options, modules: [...DefaultModules, ...modules]});
}

export function PrivateStore<S = {[key:string]: unknown}, M=unknown>(options: {modules?: Module<unknown, S>[]}){
    const modules = options?.modules ?? [];
    return new ReactPrivateStore<S, M>({...options, modules: [...DefaultModules, ...modules]});
}

export default NeuronGSM;