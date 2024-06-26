import type {
  Store,
  Module,
  SelectorKey,
  Payload,
  StoreProps,
  StoreItem,
  StateType,
  Actions,
  DispatchMutator,
  DispatchPayload,
  DispatchCallback,
  Features,
} from "./vanilla/index";
import { createStore, createModule } from "./vanilla/index";
export type {
  Store,
  Module,
  SelectorKey,
  Payload,
  StoreProps,
  StoreItem,
  StateType,
  Actions,
  DispatchMutator,
  DispatchPayload,
  DispatchCallback,
  Features,
};
export { createModule, createStore };

//used for cdns that are used in browser script tags
globalThis["Neuron"] = { createStore, createModule };
