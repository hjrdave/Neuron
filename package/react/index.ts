import { default as ReactStore } from "./Store";
import { default as ReactPrivateStore } from "./PrivateStore";
import type { Module } from "../vanilla";
import { Slices } from "../slices";

const DefaultModules = [Slices] as Module[];

export function createStore<
  S = { [key: string]: unknown },
  M = unknown
>(options?: { modules?: Module[] }) {
  const modules = options?.modules ?? [];
  return new ReactStore<S, M>({
    ...options,
    modules: [...DefaultModules, ...modules],
  });
}

export function createPrivateStore<
  S = { [key: string]: unknown },
  M = unknown
>(options: { modules?: Module[] }) {
  const modules = options?.modules ?? [];
  return new ReactPrivateStore<S, M>({
    ...options,
    modules: [...DefaultModules, ...modules],
  });
}
