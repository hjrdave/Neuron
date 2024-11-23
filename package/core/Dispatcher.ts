/**
 * Sets listeners on the Payload so when state changes it dispatches that state to the Store.
 */
import { NeuronKey } from "./Neuron";
import { IPayload } from "./Payload";

export class Dispatcher<T, F> implements IDispatcher<T, F> {
  private eventEmitters: Map<NeuronKey, DispatchCallback<T, F>[]>;
  private payload?: IPayload<T, F>;
  listen = (key: NeuronKey, callback: DispatchCallback<T, F>) => {
    const emitter = () => (this.payload ? callback?.(this.payload) : null);
    const allEmitters = this.eventEmitters.get(key);
    allEmitters
      ? allEmitters.push(emitter)
      : this.eventEmitters.set(key, [emitter]);
  };
  stopListening = (key: NeuronKey) => {
    const allEmitters = this.eventEmitters!.get(key);
    allEmitters?.splice(allEmitters.indexOf(() => null) >>> 0, 1);
  };
  dispatch = (payload: IPayload<T, F>) => {
    this.payload = payload;
    const key = payload.key;
    const allEmitters = this.eventEmitters.get(key);
    allEmitters?.slice()?.map((emitter) => {
      emitter?.(payload);
    });
  };
  public constructor() {
    this.eventEmitters = new Map();
  }
}

//Dispatcher Types and Interfaces
export interface IDispatcher<T, F> {
  listen: (key: NeuronKey, callbackfn: DispatchCallback<T, F>) => void;
  stopListening: (key: NeuronKey) => void;
  dispatch: (payload: IPayload<T, F>) => void;
}
export type Dispatch<T, F> = (mutator: DispatchMutator<T, F>) => void;
export type DispatchMutator<T, F> = (payload: IPayload<T, F>) => void;
export type DispatchCallback<T, F> = (
  payload: Readonly<IPayload<T, F>>
) => void;
