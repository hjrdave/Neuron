/**
 * Sets listeners on the Payload so when state changes it dispatches that state to the Store.
 */
import type { IPayload as Payload } from "./Payload";
import type { DispatchCallback } from "./Interfaces";

export interface IDispatcher<S, A, SelectorKey extends keyof S> {
  listen: (
    key: SelectorKey,
    callbackfn: DispatchCallback<S, A, SelectorKey>
  ) => void;
  stopListening: (key: SelectorKey) => void;
  dispatch: (payload: Payload<S, A, SelectorKey>) => void;
}

export class Dispatcher<S, A, SelectorKey extends keyof S>
  implements IDispatcher<S, A, SelectorKey>
{
  private eventEmitters: Map<
    SelectorKey,
    DispatchCallback<S, A, SelectorKey>[]
  >;
  private payload?: Payload<S, A, SelectorKey>;

  listen = (
    key: SelectorKey,
    callback: DispatchCallback<S, A, SelectorKey>
  ) => {
    const emitter = () => (this.payload ? callback?.(this.payload) : null);
    const allEmitters = this.eventEmitters.get(key);
    allEmitters
      ? allEmitters.push(emitter)
      : this.eventEmitters.set(key, [emitter]);
  };
  stopListening = (key: SelectorKey) => {
    const allEmitters = this.eventEmitters!.get(key);
    allEmitters?.splice(allEmitters.indexOf(() => null) >>> 0, 1);
  };
  dispatch = (payload: Payload<S, A, SelectorKey>) => {
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
