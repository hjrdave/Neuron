import { Bridge } from "../vanilla/vanilla.interfaces";
import { Store as CoreStore } from "../vanilla";
import ServerState, { ServerStateProps } from "./ServerState";
import useNeuronSync from "./useNeuronSync";

export default class NeuronSync<S> {
  private Core: CoreStore<S>;

  ServerState = (props: ServerStateProps) =>
    ServerState({ ...props, ...{ Store: this.Core } } as any);

  useNeuronSync = (selector: string) => useNeuronSync(selector, this.Core);

  public constructor(bridge: () => CoreStore<S>) {
    this.Core = bridge();
  }
}
