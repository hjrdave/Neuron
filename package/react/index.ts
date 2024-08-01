import { Store as ReactStore } from "./Store";
import { PrivateStore as ReactPrivateStore } from "./PrivateStore";
import type { Module } from "../vanilla";
import { Slices } from "../slices";

const DefaultModules = [Slices];

export function createStore<
  S = { [key: string]: unknown },
  A = { [key: string]: unknown }
>(options?: { modules?: Module<S, A>[] }) {
  const modules = options?.modules ?? [];
  return new ReactStore<S, A>({
    ...options,
    modules: [...DefaultModules, ...modules] as Module<S, A>[],
  });
}

export function createPrivateStore<
  S = { [key: string]: unknown },
  A = { [key: string]: unknown }
>(options?: { modules?: Module<S, A>[] }) {
  const modules = options?.modules ?? [];
  return new ReactPrivateStore<S, A>({
    ...options,
    modules: [...DefaultModules, ...modules] as Module<S, A>[],
  });
}
