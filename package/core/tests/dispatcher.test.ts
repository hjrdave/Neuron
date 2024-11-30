import { describe, it, expect, vi } from "vitest";
import { Dispatcher } from "../Dispatcher";
import { Payload } from "../Payload";

describe("Dispatcher", () => {
  describe("Listener Registration and Execution", () => {
    it("should allow listeners to be registered and triggered on dispatch", () => {
      const dispatcher = new Dispatcher<string, any>();
      const callback = vi.fn();
      const key = "testKey";

      dispatcher.listen(key, callback);

      // Create a payload with a matching key
      const payload = new Payload<string, any>({
        key,
        prevState: "oldState",
        state: "newState",
      });

      // Dispatch the payload
      dispatcher.dispatch(payload as any);

      // Assert the callback was called with the dispatched payload
      expect(callback).toHaveBeenCalledWith(payload);
    });
  });

  describe("Listener Removal", () => {
    it("should remove listeners when stopListening is called", () => {
      const dispatcher = new Dispatcher<string, any>();
      const spy = vi.fn();
      const key = "testKey";

      // Set up the listener
      dispatcher.listen(key, spy);

      // Remove the listener by passing the key and callback
      dispatcher.stopListening(key, spy);

      // Dispatch a payload for "testKey"
      const payload = new Payload<string, any>({
        key,
        state: "newState",
        prevState: "oldState",
      });

      // Assert the spy was not called because the listener has been removed
      dispatcher.dispatch(payload as any);
      expect(spy).not.toHaveBeenCalled();
    });

    it("should do nothing if the callback was not registered", () => {
      const dispatcher = new Dispatcher<string, any>();
      const spy = vi.fn();
      const key = "testKey";

      // Try removing a listener that was never added
      dispatcher.stopListening(key, spy);

      // Create a payload and dispatch
      const payload = new Payload<string, any>({
        key,
        state: "newState",
        prevState: "oldState",
      });

      // Dispatch the payload and ensure no errors are thrown
      dispatcher.dispatch(payload as any);

      // Assert the callback was not called
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe("Edge Cases", () => {
    it("should handle dispatching when no listeners are registered", () => {
      const dispatcher = new Dispatcher<string, any>();
      const key = "testKey";
      const payload = new Payload<string, any>({
        key,
        prevState: "oldState",
        state: "newState",
      });

      // Ensure no errors are thrown when dispatching with no listeners
      expect(() => dispatcher.dispatch(payload as any)).not.toThrow();
    });

    it("should immediately invoke a listener when registered, if the payload is available", () => {
      const dispatcher = new Dispatcher<string, any>();
      const callback = vi.fn();
      const key = "testKey";

      // Create a payload with matching key
      const payload = new Payload<string, any>({
        key,
        prevState: "oldState",
        state: "newState",
      });

      // Dispatch the payload first so the state is available
      dispatcher.dispatch(payload as any);

      // Register the listener and verify it is called immediately with the payload
      dispatcher.listen(key, callback);
      expect(callback).toHaveBeenCalledWith(payload);
    });
  });
});
