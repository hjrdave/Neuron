import Neuron from "../react";
import Persist, { PersistProps } from "../modules/persist";
import {
  Actions,
  DispatchPayload,
  Features,
} from "../vanilla/vanilla.interfaces";
import { CSSProperties } from "react";

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
export interface CustomStyles {
  floatingIcon?: CSSProperties;
  panel?: CSSProperties;
  topPanel?: CSSProperties;
  bottomPanel?: CSSProperties;
  rightPanel?: CSSProperties;
  leftPanel?: CSSProperties;
  header?: CSSProperties;
  breadCrumbs?: CSSProperties;
  crumb?: CSSProperties;
  stateSelectors?: CSSProperties;
  stateViewer?: CSSProperties;
  panelPositionContainer?: CSSProperties;
}
export interface State {
  devtools_panelPosition: PanelPositions;
  devtools_selectedStore: string;
  devtools_selectedKey: string;
  devtools_selectedType: string;
  devtools_openPanel: boolean;
  devtools_storeList: string[];
  devtools_keyList: string[];
  devtools_customStyles: CustomStyles;
}

export const {
  State,
  useNeuron,
  setState,
  getState,
  addState,
  onDispatch,
  Module,
  useWeakNeuron,
} = Neuron.Store<State, PersistProps>();

export default function Store() {
  return (
    <>
      <Module use={Persist} />
      <State<PanelPositions>
        name={"devtools_panelPosition"}
        state={PanelPositions.Top}
        persist
      />
      <State<string>
        name={"devtools_selectedStore"}
        state={""}
        persist
        onCallback={(payload) => {
          const selectedStoreData = payload.get<StateItem>(
            payload.state as any
          );
          const keyList = Object.keys(selectedStoreData);
          payload.set("devtools_keyList" as any, keyList);
        }}
      />
      <State<string> name={"devtools_selectedKey"} state={""} persist />
      <State<string> name={"devtools_selectedType"} state={""} persist />
      <State<boolean> name={"devtools_openPanel"} state={false} persist />
      <State<string[]>
        name={"devtools_storeList"}
        state={[]}
        onRun={(payload) => {
          payload.state = [...new Set(payload.state)];
        }}
        persist
      />
      <State<string[]> name={"devtools_keyList"} state={[]} persist />
      <State<CustomStyles> name={"devtools_customStyles"} state={{}} />
    </>
  );
}
