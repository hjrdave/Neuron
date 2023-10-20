import React from 'react';
import {Module as IModule, Store} from '@neurongsm/core';
export interface ModuleProps<S = {[key:string]: unknown}> {
    use: IModule<unknown, S>
}              
interface Props<S = {[key:string]: unknown}> extends ModuleProps<S>{
    Store: Store<S>
}

export default function Module<S = {[key:string]: unknown}>({ use, Store }: Props<S>) {

    Store.use(use);

    return (<></>);
}