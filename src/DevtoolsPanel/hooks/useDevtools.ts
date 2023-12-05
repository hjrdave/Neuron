import { getState, setState, addState, StateItem } from "../Store";
import Payload from "../../vanilla/Payload";
const useDevtoolsPanel = () => {
  const connectToDevtoolsPanel = (storeName: string) => {
    addState({
      key: storeName,
      state: {},
    });
  };
  const setStoreList = (storeName: string) => {
    const currentStoreList = getState("devtools_storeList") ?? [];
    const updatedStoreList = [...currentStoreList, storeName];
    setState("devtools_storeList", updatedStoreList);
  };
  const updateDevtoolsPanel = (storeName: string, payload: Payload) => {
    const allStoreItems = getState(storeName);
    setState<StateItem>(storeName, {
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
          isDispatchCancelled: payload.isDispatchCancelled,
        },
      },
    });
  };
  return {
    setStoreList,
    connectToDevtoolsPanel,
  };
};
export default useDevtoolsPanel;
