import Neuron from "../../vanilla";
import {
  getState,
  setState,
  addState,
  StateItem,
} from "../../DevtoolsPanel/Store";

interface Options {
  storeName: string;
}
export interface ModuleProps {}

const moduleName = `@sandstack/neuron/devtools`; //need a unique id that is passed by store

const Devtools = ({ storeName }: Options) => {
  const storeList = getState("storeList") ?? [];
  setState("storeList", [...(storeList as string[]), storeName]);
  addState({
    key: storeName,
    state: {},
  });
  return Neuron.Module({
    name: moduleName,
    onLoad: (payload) => {
      const allStoreItems = getState(storeName as any);
      setState<StateItem>(storeName as any, {
        ...(allStoreItems as any),
        [payload.key]: {
          state: payload.state,
          actions: {},
          features: payload.features,
          payload: {
            key: payload.key,
            state: payload.state,
            prevState: payload.prevState,
            features: payload.features,
            data: payload.data,
            isDispatchCancelled: payload.isDispatchCancelled,
          },
        },
      });
    },
    onCallback: (payload) => {
      const allStoreItems = getState(storeName as any);
      setState<StateItem>(storeName as any, {
        ...(allStoreItems as any),
        [payload.key]: {
          state: payload.state,
          actions: {},
          features: payload.features,
          payload: {
            key: payload.key,
            state: payload.state,
            prevState: payload.prevState,
            features: payload.features,
            data: payload.data,
            isDispatchCancelled: payload.isDispatchCancelled(),
          },
        },
      });
    },
  });
};
export default Devtools;
