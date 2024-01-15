/**
 * Sets listeners on the Payload so when state changes it dispatches that state to the Store.
 * (Will be using mitt for now, will have a lighter solution)
 */
import type { IPayload as Payload } from "./Payload";
import type {
  DispatchCallback,
  StoreProps,
  SelectorKey,
  StateType,
} from "./Interfaces";

export interface IDispatcher<S = StoreProps> {
  listen: (key: SelectorKey<S>, callbackfn: DispatchCallback<S>) => void;
  stopListening: (key: SelectorKey<S>) => void;
  dispatch: DispatchCallback<S>;
}

export default class Dispatcher<S = StoreProps> implements IDispatcher<S> {
  private eventEmitters: Map<unknown, DispatchCallback<S>[]>;
  private payload?: Payload<StateType, S>;

  listen = (key: SelectorKey<S>, callback: DispatchCallback<S>) => {
    const emitter = () => (this.payload ? callback?.(this.payload) : null);
    const allEmitters = this.eventEmitters.get(key);
    allEmitters
      ? allEmitters.push(emitter)
      : this.eventEmitters.set(key, [emitter]);
  };
  stopListening = (key: SelectorKey<S>) => {
    const allEmitters = this.eventEmitters!.get(key);
    allEmitters?.splice(allEmitters.indexOf(() => null) >>> 0, 1);
  };
  dispatch = (payload: Payload<StateType, S>) => {
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
