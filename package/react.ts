import { createStore, createPrivateStore } from "./react/index";
export { createPrivateStore, createStore };
globalThis["NeuronReact"] = {
  createPrivateStore,
  createStore,
};
