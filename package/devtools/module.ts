import Neuron from "../vanilla";
import DevtoolsConnection from "./connect";

interface Options {
  storeName: string;
}

const moduleName = `@sandstack/neuron-devtools`; //need a unique id that is passed by store

const Devtools = ({ storeName }: Options) => {
  const devtools = new DevtoolsConnection();
  devtools.connectToPanel(storeName);
  return Neuron.Module({
    name: moduleName,
    onLoad: (payload) => {
      devtools.sendPayloadToPanel(payload);
    },
    onCallback: (payload) => {
      devtools.sendPayloadToPanel(payload);
    },
  }) as any;
};
export default Devtools;
