import { default as ReactStore } from "./Store";
import { default as ReactPrivateStore } from "./PrivateStore";
import type { Module } from "../vanilla";
import Slices from "../slices";

const DefaultModules = [Slices] as Module[];
namespace Neuron {
  export function Store<S = { [key: string]: unknown }, M = unknown>(options?: {
    modules?: Module<unknown, S>[];
  }) {
    const modules = options?.modules ?? [];
    return new ReactStore<S, M>({
      ...options,
      modules: [...DefaultModules, ...modules],
    });
  }

  export function PrivateStore<
    S = { [key: string]: unknown },
    M = unknown
  >(options?: { modules?: Module<unknown, S>[] }) {
    const modules = options?.modules ?? [];
    return new ReactPrivateStore<S, M>({
      ...options,
      modules: [...DefaultModules, ...modules],
    });
  }
}

export function Store<S = { [key: string]: unknown }, M = unknown>(options?: {
  modules?: Module<unknown, S>[];
}) {
  const modules = options?.modules ?? [];
  return new ReactStore<S, M>({
    ...options,
    modules: [...DefaultModules, ...modules],
  });
}

export function PrivateStore<
  S = { [key: string]: unknown },
  M = unknown
>(options: { modules?: Module<unknown, S>[] }) {
  const modules = options?.modules ?? [];
  return new ReactPrivateStore<S, M>({
    ...options,
    modules: [...DefaultModules, ...modules],
  });
}

export default Neuron;
