import React from 'react';
import {UseDispatch} from './useDispatch';
import {UseNeuron} from './useNeuron';
import {UseStore} from './useStore';

interface ContextProps<S = {[key:string]: any}>{
    useNeuron: UseNeuron<S>;
    useDispatch: UseDispatch<S>; 
    useStore: UseStore<S>;
}
interface Props<S = {[key:string]: any}>{
    children?: React.ReactNode;
    context: React.Context<ContextProps<S>>;
    useNeuron: UseNeuron<S>;
    useDispatch: UseDispatch<S>;
    useStore: UseStore<S>;
};

export default function Private<S = {[key:string]: any}>({children, context: Context, useNeuron, useStore, useDispatch}: Props<S>){

    const [contextProps] = React.useState<ContextProps<S>>({useNeuron, useStore, useDispatch}); 

    return(
        <>
            <Context.Provider value={contextProps}>
                {children}
            </Context.Provider>
        </>
    )
}