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

export class Neuron<T, A> implements INeuron<T, A> {
  private store: ClientStore<unknown, unknown>;
  private modules: IModule[];
  private dispatcher: IDispatcher<T>;
  readonly key: NeuronKey;
  readonly set = (newState: T | ((prevState: T) => T)) => {
    const neuronData = this.store.get(this.key) as NeuronData<T, A>;
    const payload = new Payload<T>({
      key: this.key,
      prevState: neuronData?.prevState as T,
      state:
        typeof newState === "function"
          ? (newState as (prevState: T) => T)(neuronData?.state as T)
          : newState,
    });
    if (payload.state !== payload.prevState) {
      neuronData?.onDispatch?.(payload);
      for (let i = 0; i < this.modules.length; i++) {
        if (!payload.isDispatchCancelled()) {
          this.modules[i].onDispatch?.(payload as IPayload<unknown>);
          continue;
        }
        break;
      }
      if (!payload.isDispatchCancelled()) {
        this.store.set(this.key, {
          ...neuronData,
          state: payload?.state,
          prevState: neuronData.state,
        } as NeuronData<unknown, A>);
        this.dispatcher.dispatch(payload);
        neuronData?.onCallback?.(payload);
        this.modules.forEach((module) => {
          module?.onCallback?.(payload as IPayload<unknown>);
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
  readonly dispatch = (mutator: DispatchMutator<T>) => {
    const neuronData = this.store.get(this.key) as NeuronData<T, A>;
    const payload = new Payload<T>({
      key: this.key,
      state: neuronData?.state,
      prevState: neuronData?.state,
    });
    mutator(payload);
    if (!payload.isDispatchCancelled()) {
      neuronData?.onDispatch?.(payload);
      for (let i = 0; i < this.modules.length; i++) {
        if (!payload.isDispatchCancelled()) {
          this.modules[i].onDispatch?.(payload as IPayload<unknown>);
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
      this.store.set(this.key, newNeuronData as NeuronData<unknown, A>);
      this.dispatcher.dispatch(payload);
      neuronData?.onCallback?.(payload);
      this.modules.forEach((module) => {
        module?.onCallback?.(payload as IPayload<unknown>);
      });
    }
  };
  readonly getActions = () => {
    const neuronActions = (this.store.get(this.key) as NeuronData<T, A>)
      ?.actions;
    return (neuronActions?.(this.dispatch) as A) ?? ({} as A);
  };
  readonly effect = (callbackFn: DispatchCallback<T>) => {
    this.dispatcher.stopListening(this.key, callbackFn);
    this.dispatcher.listen(this.key, callbackFn);
  };

  constructor(
    initialState: T,
    options?: NeuronOptions<T, A>,
    clientStore?: ClientStore<unknown, unknown>,
    dispatcher?: IDispatcher<T>
  ) {
    this.key = options?.key ?? crypto.randomUUID();
    this.store =
      clientStore ?? new Map<NeuronKey, NeuronData<unknown, unknown>>();
    this.modules = options?.modules ?? [];
    this.dispatcher = dispatcher ?? new Dispatcher<T>();
    const payload = new Payload<T>({
      key: this.key,
      state: initialState,
      prevState: initialState,
    });
    options?.onInit?.(payload);
    this.modules.forEach((module) => {
      module?.onInit?.(payload as IPayload<unknown>);
    });
    this.store.set(payload.key, {
      ...options,
      key: payload.key,
      state: payload?.state,
      prevState: payload?.prevState,
    } as NeuronData<unknown, A>);
  }
}

//Neuron Types and Interfaces

/**
 * Interface representing the core functionality of a Neuron,
 * which holds state and provides methods to manipulate it.
 *
 * @template T - The type of the state held by the Neuron.
 * @template A - The type of actions associated with the Neuron.
 */
export interface INeuron<T, A> {
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
  readonly dispatch: Dispatch<T>;

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
  readonly effect: (callbackFn: DispatchCallback<T>) => void;

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
 */
export interface NeuronOptions<T, A> {
  /**
   * A unique key to identify the Neuron. If not provided, a random key is generated.
   */
  key?: NeuronKey;

  /**
   * Takes an array of Neuron Modules for extending Neuron state with more features.
   */
  modules?: IModule[];

  /**
   * A function that generates action methods for interacting with the Neuron's state.
   */
  actions?: NeuronActions<T, A>;

  /**
   * A middleware function invoked during the Neuron's initialization.
   *
   * @param payload - The payload containing state details during initialization.
   */
  onInit?: NeuronMiddleware<T>;

  /**
   * A middleware function invoked when the Neuron's state is updated.
   *
   * @param payload - The payload containing state details during dispatch.
   */
  onDispatch?: NeuronMiddleware<T>;

  /**
   * A middleware function invoked after the Neuron's state has been updated.
   *
   * @param payload - The payload containing state details after dispatch.
   */
  onCallback?: NeuronMiddleware<T>;
}
/**
 * Represents the data stored in a Neuron instance, including state and middleware.
 *
 * @template T - The type of the state held by the Neuron.
 * @template A - The type of actions associated with the Neuron.
 */
export interface NeuronData<T, A> {
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
   * A function that generates action methods for interacting with the Neuron's state.
   */
  actions?: NeuronActions<T, A>;

  /**
   * Middleware invoked during the Neuron's initialization.
   */
  onInit?: NeuronMiddleware<T>;

  /**
   * Middleware invoked when the Neuron's state is updated.
   */
  onDispatch?: NeuronMiddleware<T>;

  /**
   * Middleware invoked after the Neuron's state has been updated.
   */
  onCallback?: NeuronMiddleware<T>;
}

/**
 * A middleware function used during various stages of a Neuron's lifecycle.
 *
 * @template T - The type of the state held by the Neuron.
 *
 * @param payload - The payload containing the state and metadata during the middleware execution.
 */
export type NeuronMiddleware<T> = (payload: IPayload<T>) => void;
/**
 * Represents a unique key used to identify a Neuron instance.
 */
export type NeuronKey = string | number;
/**
 * A function that generates action methods for interacting with the Neuron's state.
 *
 * @template T - The type of the state held by the Neuron.
 * @template A - The type of actions to be generated.
 *
 * @param dispatch - The dispatch function for sending state mutations.
 * @returns A collection of action methods.
 */
export type NeuronActions<T, A> = (dispatch: Dispatch<T>) => A;
