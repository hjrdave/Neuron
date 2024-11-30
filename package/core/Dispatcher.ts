import { NeuronKey } from "./Neuron";
import { IPayload } from "./Payload";

export class Dispatcher<T, F> implements IDispatcher<T, F> {
  private eventEmitters: Map<NeuronKey, Set<DispatchCallback<T, F>>> =
    new Map();
  private payload?: IPayload<T, F>;

  /**
   * Registers a callback to listen to changes associated with the given key.
   * @param key - The unique identifier for the Neuron whose state changes should be listened to.
   * @param callback - The function to invoke when the state changes.
   */
  listen(key: NeuronKey, callback: DispatchCallback<T, F>) {
    if (!this.eventEmitters.has(key)) {
      this.eventEmitters.set(key, new Set());
    }
    this.eventEmitters.get(key)?.add(callback);

    // Immediately invoke the callback with the current state, if available
    if (this.payload?.key === key) {
      callback(this.payload);
    }
  }

  /**
   * Stops listening for changes for the given key and removes the specific callback.
   * @param key - The unique identifier for the Neuron.
   * @param callback - The callback to remove from the listeners.
   */
  stopListening(key: NeuronKey, callback: DispatchCallback<T, F>) {
    const listeners = this.eventEmitters.get(key);
    if (listeners) {
      listeners.delete(callback);
      if (listeners.size === 0) {
        this.eventEmitters.delete(key); // Clean up if no listeners remain
      }
    }
  }

  /**
   * Dispatches a payload to all registered listeners associated with the payload's key.
   * @param payload - The payload containing the state and metadata to dispatch.
   */
  dispatch(payload: IPayload<T, F>) {
    this.payload = payload;
    const listeners = this.eventEmitters.get(payload.key);
    listeners?.forEach((listener) => {
      listener(payload);
    });
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
  stopListening: (key: NeuronKey, callback: DispatchCallback<T, F>) => void;

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
