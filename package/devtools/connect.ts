import { addState, getState, setState, StateItem, State } from "./panel/Store";
import { Payload } from "../vanilla";
interface IDevtoolsConnection {
  storeName?: string;
  connectToPanel: (storeName: string) => void;
  sendPayloadToPanel: (
    payload: Payload<unknown, { [key: string]: any }>
  ) => void;
}
export default class DevtoolsConnection implements IDevtoolsConnection {
  public storeName?: string;
  connectToPanel = (storeName: string) => {
    this.storeName = storeName;
    addState<{ [key: string]: any }>({
      key: this.storeName,
      state: {},
    });
    const currentStoreList = getState<string[]>("devtools_storeList") ?? [];
    const updatedStoreList = [...currentStoreList, this.storeName];
    setState("devtools_storeList", updatedStoreList);
  };
  sendPayloadToPanel = (payload: any) => {
    if (this.storeName) {
      const allStoreItems = getState<{ [key: string]: any }>(
        this.storeName as keyof State
      );
      setState<StateItem>(this.storeName as keyof State, {
        ...allStoreItems,
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
    } else {
      console.error(
        `Neuron Devtools:`,
        `Store must be connected to Devtools Panel. Make sure you have ran 'connectToPanel' first.`
      );
    }
  };
}
