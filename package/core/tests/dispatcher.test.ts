import { describe, it, expect, vi } from "vitest";
import { Dispatcher } from "../Dispatcher";
import { Payload } from "../Payload";

describe("Dispatcher", () => {
  describe("Listener Registration and Execution", () => {
    it("should allow listeners to be registered and triggered on dispatch", () => {
      const dispatcher = new Dispatcher();
      const callback = vi.fn();
      const key = "testKey";

      dispatcher.listen(key, callback);
      const payload = new Payload({
        key,
        prevState: "oldState",
        state: "newState",
      });

      dispatcher.dispatch(payload as any);

      expect(callback).toHaveBeenCalledWith(payload);
    });
  });

  describe("Listener Removal", () => {
    it("should remove listeners when stopListening is called", async () => {
      const dispatcher = new Dispatcher();
      const spy = vi.fn();

      // Set up the listener
      dispatcher.listen("testKey", spy);

      // Stop listening before dispatching
      dispatcher.stopListening("testKey");

      // Dispatch a payload for "testKey"
      const payload = new Payload({
        key: "testKey",
        state: "newState",
        prevState: "oldState",
      });
      dispatcher.dispatch(payload as any);

      // Assert the spy was not called because the listener has been removed
      expect(spy).not.toHaveBeenCalled();
    });

    describe("Edge Cases", () => {
      it("should handle dispatching when no listeners are registered", () => {
        const dispatcher = new Dispatcher();
        const key = "testKey";
        const payload = new Payload({
          key,
          prevState: "oldState",
          state: "newState",
        });

        expect(() => dispatcher.dispatch(payload as any)).not.toThrow();
      });
    });
  });
});
