import DevTools from "./DevTools";
import {
  useNeuron as useDevToolsNeuron,
  setState as setDevToolsState,
} from "../DevTools/Store";
import useDevtools from "./hooks/useDevtools";

export { useDevtools, useDevToolsNeuron, setDevToolsState };
export default DevTools;
