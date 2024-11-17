/**
 * Sets listeners on the Payload so when state changes it dispatches that state to the Store.
 */
import type {
  DispatchCallback,
  IDispatcher,
  IPayload,
  NeuronKey,
} from "./Interfaces";

export class Dispatcher<T> implements IDispatcher<T> {
  private eventEmitters: Map<NeuronKey, DispatchCallback<T>[]>;
  private payload?: IPayload<T>;

  listen = (key: NeuronKey, callback: DispatchCallback<T>) => {
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
  dispatch = (payload: IPayload<T>) => {
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
