import Neuron from "../react";
import {
  Actions,
  DispatchPayload,
  Features,
} from "../vanilla/vanilla.interfaces";

export enum PanelPositions {
  Top = "top",
  Bottom = "bottom",
  Right = "right",
  Left = "left",
  Expand = "expand",
}
interface SelectedStore {
  name: string;
  stateKey: string;
  stateType: "action" | "state" | "feature";
}
interface StoreData {
  [storeName: string]: {
    [stateKey: string]: {
      state: any;
      actions?: Actions;
      features?: Features;
      payload?: DispatchPayload;
    };
  };
}

interface State {
  panelPosition: PanelPositions;
  selectedStore: SelectedStore | null;
  storeData: StoreData | null;
  openPanel: boolean;
}

export const { State, useNeuron, setState, getState } = Neuron.Store<State>();
export const setStoreData = (storeData: StoreData) =>
  setState("storeData", storeData);
export const getStoreData = () => getState("storeData");

export default function Store() {
  return (
    <>
      <State<PanelPositions>
        name={"panelPosition"}
        state={PanelPositions.Top}
      />
      <State<SelectedStore | null>
        name={"selectedStore"}
        state={{ foo: "moo" } as any}
      />
      <State<StoreData | null> name={"storeData"} state={{}} />
      <State<boolean> name={"openPanel"} state={false} />
    </>
  );
}
