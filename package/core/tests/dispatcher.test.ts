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
    it("should remove listeners when stopListening is called", () => {
      const dispatcher = new Dispatcher();
      const callback = vi.fn();
      const key = "testKey";

      dispatcher.listen(key, callback);
      dispatcher.stopListening(key);

      dispatcher.dispatch(
        new Payload({ key, prevState: "oldState", state: "newState" })
      );

      expect(callback).not.toHaveBeenCalled();
    });
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
