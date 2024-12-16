import { neuron } from "../react";
import {
  Dispatch,
  DispatchCallback,
  Dispatcher,
  DispatchMutator,
  IDispatcher,
} from "./Dispatcher";
import { IModule } from "./Module";
import { ClientStore } from "./NeuronClient";
import { IPayload, Payload } from "./Payload";

export class Neuron<T, A, F> implements INeuron<T, A, F> {
  private store: ClientStore<unknown, unknown, F>;
  private modules: IModule<F>[];
  private dispatcher: IDispatcher<T, F>;
  readonly key: NeuronKey;
  readonly set = (newState: T | ((prevState: T) => T)) => {
    const neuronData = this.store.get(this.key) as NeuronData<T, A, F>;
    const payload = new Payload<T, F>({
      key: this.key,
      prevState: neuronData?.prevState as T,
      state:
        typeof newState === "function"
          ? (newState as (prevState: T) => T)(neuronData?.state as T)
          : newState,
      features: neuronData.features,
    });
    if (payload.state !== payload.prevState) {
      neuronData?.onDispatch?.(payload);
      for (let i = 0; i < this.modules.length; i++) {
        if (!payload.isDispatchCancelled()) {
          this.modules[i].onDispatch?.(payload as IPayload<unknown, F>);
          continue;
        }
        break;
      }
      if (!payload.isDispatchCancelled()) {
        this.store.set(this.key, {
          ...neuronData,
          state: payload?.state,
          prevState: neuronData.state,
        } as NeuronData<unknown, A, F>);
        this.dispatcher.dispatch(payload);
        neuronData?.onCallback?.(payload);
        this.modules.forEach((module) => {
          module?.onCallback?.(payload as IPayload<unknown, F>);
        });
      }
    }
  };
  readonly getClone = () => {
    const neuronState = this.store.get(this.key)?.state as T;
    if (structuredClone !== undefined || structuredClone !== null) {
      return structuredClone(neuronState);
    }
    return neuronState;
  };
  readonly getRef = () => this.store.get(this.key)?.state as T;
  readonly dispatch = (mutator: DispatchMutator<T, F>) => {
    const neuronData = this.store.get(this.key) as NeuronData<T, A, F>;
    const payload = new Payload<T, F>({
      key: this.key,
      state: neuronData?.state,
      prevState: neuronData?.state,
      features: neuronData.features,
    });
    mutator(payload);
    if (!payload.isDispatchCancelled()) {
      neuronData?.onDispatch?.(payload);
      for (let i = 0; i < this.modules.length; i++) {
        if (!payload.isDispatchCancelled()) {
          this.modules[i].onDispatch?.(payload as IPayload<unknown, F>);
          continue;
        }
        break;
      }
    }
    if (!payload.isDispatchCancelled()) {
      const newNeuronData = {
        ...neuronData,
        state: payload.state,
        prevState: neuronData.state,
      };
      this.store.set(this.key, newNeuronData as NeuronData<unknown, A, F>);
      this.dispatcher.dispatch(payload);
      neuronData?.onCallback?.(payload);
      this.modules.forEach((module) => {
        module?.onCallback?.(payload as IPayload<unknown, F>);
      });
    }
  };
  readonly getActions = () => {
    const neuronActions = (this.store.get(this.key) as NeuronData<T, A, F>)
      ?.actions;
    return (neuronActions?.(this.dispatch) as A) ?? ({} as A);
  };
  readonly effect = (callbackFn: DispatchCallback<T, F>) => {
    this.dispatcher.stopListening(this.key, callbackFn);
    this.dispatcher.listen(this.key, callbackFn);
  };

  constructor(
    initialState: T,
    options?: NeuronOptions<T, A, F>,
    modules?: IModule<F>[],
    clientStore?: ClientStore<unknown, unknown, F>,
    dispatcher?: IDispatcher<T, F>
  ) {
    this.key = options?.key ?? crypto.randomUUID();
    this.store =
      clientStore ?? new Map<NeuronKey, NeuronData<unknown, unknown, F>>();
    this.modules = modules ?? [];
    this.dispatcher = dispatcher ?? new Dispatcher<T, F>();
    const payload = new Payload<T, F>({
      key: this.key,
      state: initialState,
      prevState: initialState,
      features: options?.features,
    });
    options?.onInit?.(payload);
    this.modules.forEach((module) => {
      module?.onInit?.(payload as IPayload<unknown, F>);
    });
    this.store.set(payload.key, {
      ...options,
      key: payload.key,
      state: payload?.state,
      prevState: payload?.prevState,
    } as NeuronData<unknown, A, F>);
  }
}

//Neuron Types and Interfaces

/**
 * Interface representing the core functionality of a Neuron,
 * which holds state and provides methods to manipulate it.
 *
 * @template T - The type of the state held by the Neuron.
 * @template A - The type of actions associated with the Neuron.
 * @template F - The type of additional features or metadata for the Neuron.
 */
export interface INeuron<T, A, F> {
  /**
   * A unique key identifying the Neuron instance.
   */
  readonly key: NeuronKey;

  /**
   * Updates the state of the Neuron.
   *
   * @param newState - The new state to set, or a function that takes the previous state
   * and returns the updated state.
   */
  readonly set: (newState: T | ((prevState: T) => T)) => void;

  /**
   * Sends a mutator function to process and update the Neuron's state.
   *
   * @param mutator - A function that modifies the payload, allowing complex state updates.
   */
  readonly dispatch: Dispatch<T, F>;

  /**
   * Returns a deep clone of the current Neuron state.
   *
   * @returns A cloned copy of the current state.
   */
  readonly getClone: () => T;

  /**
   * Returns a reference to the current state without cloning.
   *
   * @returns A reference to the current state.
   */
  readonly getRef: () => T;

  /**
   * Registers a callback function to be invoked whenever the Neuron's state is updated.
   *
   * @param callbackFn - A callback function that receives the payload with state details.
   */
  readonly effect: (callbackFn: DispatchCallback<T, F>) => void;

  /**
   * Retrieves action methods associated with the Neuron,
   * which are functions for interacting with the state.
   *
   * @returns The action methods associated with the Neuron.
   */
  readonly getActions: () => A;
}
/**
 * Configuration options for creating a Neuron instance.
 *
 * @template T - The type of the initial state.
 * @template A - The type of the actions associated with the Neuron.
 * @template F - The type of additional features or metadata for the Neuron.
 */
export interface NeuronOptions<T, A, F> {
  /**
   * A unique key to identify the Neuron. If not provided, a random key is generated.
   */
  key?: NeuronKey;

  /**
   * Optional features or metadata associated with the Neuron.
   */
  features?: F;

  /**
   * A function that generates action methods for interacting with the Neuron's state.
   */
  actions?: NeuronActions<T, A, F>;

  /**
   * A middleware function invoked during the Neuron's initialization.
   *
   * @param payload - The payload containing state details during initialization.
   */
  onInit?: NeuronMiddleware<T, F>;

  /**
   * A middleware function invoked when the Neuron's state is updated.
   *
   * @param payload - The payload containing state details during dispatch.
   */
  onDispatch?: NeuronMiddleware<T, F>;

  /**
   * A middleware function invoked after the Neuron's state has been updated.
   *
   * @param payload - The payload containing state details after dispatch.
   */
  onCallback?: NeuronMiddleware<T, F>;
}
/**
 * Represents the data stored in a Neuron instance, including state and middleware.
 *
 * @template T - The type of the state held by the Neuron.
 * @template A - The type of actions associated with the Neuron.
 * @template F - The type of additional features or metadata for the Neuron.
 */
export interface NeuronData<T, A, F> {
  /**
   * The unique key identifying the Neuron.
   */
  key: Readonly<NeuronKey>;

  /**
   * The current state of the Neuron.
   */
  state: T;

  /**
   * The previous state of the Neuron, retained for comparison or rollback.
   */
  prevState: Readonly<T>;

  /**
   * Additional features or metadata associated with the Neuron.
   *
   * The `features` property is a generic type (`F`) that allows customization of
   * the behavior and capabilities of the Neuron. It can hold configuration
   * options, flags, or additional data that extend the functionality of the Neuron.
   *
   * Examples of potential uses:
   * - Persisting the state of the Neuron to local or session storage.
   * - Adding flags for logging, caching, or feature toggles.
   * - Storing metadata relevant to specific modules or extensions.
   *
   * @template F - The type of features or metadata for the Neuron.
   */
  features: F;

  /**
   * A function that generates action methods for interacting with the Neuron's state.
   */
  actions?: NeuronActions<T, A, F>;

  /**
   * Middleware invoked during the Neuron's initialization.
   */
  onInit?: NeuronMiddleware<T, F>;

  /**
   * Middleware invoked when the Neuron's state is updated.
   */
  onDispatch?: NeuronMiddleware<T, F>;

  /**
   * Middleware invoked after the Neuron's state has been updated.
   */
  onCallback?: NeuronMiddleware<T, F>;
}

/**
 * A middleware function used during various stages of a Neuron's lifecycle.
 *
 * @template T - The type of the state held by the Neuron.
 * @template F - The type of additional features or metadata for the Neuron.
 *
 * @param payload - The payload containing the state and metadata during the middleware execution.
 */
export type NeuronMiddleware<T, F> = (payload: IPayload<T, F>) => void;
/**
 * Represents a unique key used to identify a Neuron instance.
 */
export type NeuronKey = string | number;
/**
 * A function that generates action methods for interacting with the Neuron's state.
 *
 * @template T - The type of the state held by the Neuron.
 * @template A - The type of actions to be generated.
 * @template F - The type of additional features or metadata for the Neuron.
 *
 * @param dispatch - The dispatch function for sending state mutations.
 * @returns A collection of action methods.
 */
export type NeuronActions<T, A, F> = (dispatch: Dispatch<T, F>) => A;
