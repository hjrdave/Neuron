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
export interface StateItem {
  [stateKey: string]: {
    state: any;
    actions?: Actions;
    features?: Features;
    payload?: DispatchPayload;
  };
}

interface State {
  panelPosition: PanelPositions;
  selectedStore: string;
  selectedKey: string;
  selectedType: string;
  openPanel: boolean;
  storeList: string[];
  keyList: string[];
}

export const { State, useNeuron, setState, getState, addState, onDispatch } =
  Neuron.Store<State>();

export default function Store() {
  return (
    <>
      <State<PanelPositions>
        name={"panelPosition"}
        state={PanelPositions.Top}
      />
      <State<string>
        name={"selectedStore"}
        state={""}
        onCallback={(payload) => {
          const selectedStoreData = payload.get<StateItem>(
            payload.state as any
          );
          const keyList = Object.keys(selectedStoreData);
          payload.set("keyList" as any, keyList);
        }}
      />
      <State<string> name={"selectedKey"} state={""} />
      <State<string> name={"selectedType"} state={""} />
      <State<boolean> name={"openPanel"} state={false} />
      <State<string[]>
        name={"storeList"}
        state={[]}
        onRun={(payload) => {
          payload.state = [...new Set(payload.state)];
        }}
      />
      <State<string[]> name={"keyList"} state={[]} />
    </>
  );
}
