import { addState, getState, setState, StateItem, State } from "./Store";
import Payload from "../vanilla/Payload";
interface IDevtools {
  storeName: string;
  connectToPanel: () => void;
  sendPayloadToPanel: (
    payload: Payload<unknown, { [key: string]: any }>
  ) => void;
}
export default class Devtools implements IDevtools {
  public storeName: string;
  connectToPanel = () => {
    addState({
      key: this.storeName,
      state: {},
    });
    const currentStoreList = (getState("devtools_storeList") as string[]) ?? [];
    const updatedStoreList = [...currentStoreList, this.storeName];
    setState("devtools_storeList", updatedStoreList);
  };
  sendPayloadToPanel = (payload: any) => {
    const allStoreItems = getState(this.storeName as keyof State) as {
      [key: string]: any;
    };
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
  };
  public constructor({ storeName }: { storeName: string }) {
    this.storeName = storeName;
  }
}
