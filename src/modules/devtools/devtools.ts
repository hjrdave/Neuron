import Neuron from "../../vanilla";
import { setStoreData, getStoreData } from "../../DevTools/Store";

interface Options {
  storeName: string;
}
export interface ModuleProps {}

const moduleName = `@sandstack/neuron/devtools`; //need a unique id that is passed by store

const Devtools = ({ storeName }: Options) => {
  return Neuron.Module({
    name: moduleName,
    onLoad: (payload) => {
      const storeData = getStoreData() ?? {};
      setStoreData({
        ...storeData,
        [storeName]: {
          [payload.key]: {
            state: payload.state,
            actions: {},
            features: payload.features,
            payload: payload,
          },
        },
      });
    },
    onCallback: (payload) => {
      const storeData = getStoreData() ?? {};
      setStoreData({
        ...storeData,
        [storeName]: {
          [payload.key]: {
            state: payload.state,
            actions: {},
            features: payload.features,
            payload: payload,
          },
        },
      });
    },
  });
};
export default Devtools;
