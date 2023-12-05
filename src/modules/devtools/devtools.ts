import Neuron from "../../vanilla";
import { Devtools as DevtoolsInstance } from "../../DevtoolsPanel";

interface Options {
  storeName: string;
}
export interface ModuleProps {}

const moduleName = `@sandstack/neuron/devtools`; //need a unique id that is passed by store

const Devtools = ({ storeName }: Options) => {
  const devtools = new DevtoolsInstance({ storeName: storeName });
  devtools.connectToPanel();
  return Neuron.Module({
    name: moduleName,
    onLoad: (payload) => {
      devtools.sendPayloadToPanel(payload);
    },
    onCallback: (payload) => {
      devtools.sendPayloadToPanel(payload);
    },
  });
};
export default Devtools;
