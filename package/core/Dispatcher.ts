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
    const allEmitters = this.eventEmitters.get(key);
    allEmitters ? this.eventEmitters.set(key, []) : null;
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

/**
 * Interface for a dispatcher that listens to state changes and dispatches payloads to registered callbacks.
 *
 * @template T - The type of the state being managed.
 * @template F - The type of additional features or metadata associated with the state.
 */
export interface IDispatcher<T, F> {
  /**
   * Registers a callback to be invoked whenever the state associated with the given key changes.
   *
   * @param key - The unique identifier for the Neuron whose state changes should be listened to.
   * @param callbackfn - The function to call when the state changes. It receives the payload with the new state.
   */
  listen: (key: NeuronKey, callbackfn: DispatchCallback<T, F>) => void;

  /**
   * Unregisters all callbacks associated with the given key, effectively stopping any listening on that key.
   *
   * @param key - The unique identifier for the Neuron whose state changes should no longer be listened to.
   */
  stopListening: (key: NeuronKey) => void;

  /**
   * Dispatches the given payload to all registered callbacks associated with the payload's key.
   *
   * @param payload - The payload containing the state and metadata to be dispatched.
   */
  dispatch: (payload: IPayload<T, F>) => void;
}

/**
 * Type representing a function that dispatches a mutator function to modify the state.
 *
 * @template T - The type of the state being managed.
 * @template F - The type of additional features or metadata associated with the state.
 */
export type Dispatch<T, F> = (mutator: DispatchMutator<T, F>) => void;

/**
 * Type representing a mutator function that modifies the payload's state.
 *
 * @template T - The type of the state being managed.
 * @template F - The type of additional features or metadata associated with the state.
 */
export type DispatchMutator<T, F> = (payload: IPayload<T, F>) => void;

/**
 * Type representing a callback function that processes a dispatched payload.
 *
 * @template T - The type of the state being managed.
 * @template F - The type of additional features or metadata associated with the state.
 *
 * @param payload - The payload containing the current state and metadata.
 */
export type DispatchCallback<T, F> = (
  payload: Readonly<IPayload<T, F>>
) => void;
