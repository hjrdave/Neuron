import { describe, it, expect } from "vitest";
import { Payload } from "../Payload";

describe("Payload", () => {
  it("should initialize with provided values", () => {
    const payload = new Payload({
      key: "testKey",
      prevState: "oldState",
      state: "newState",
    });

    expect(payload.key).toBe("testKey");
    expect(payload.prevState).toBe("oldState");
    expect(payload.state).toBe("newState");
  });

  it("should support canceling dispatch", () => {
    const payload = new Payload({
      key: "testKey",
      prevState: "oldState",
      state: "newState",
    });

    expect(payload.isDispatchCancelled()).toBe(false);
    payload.cancelDispatch();
    expect(payload.isDispatchCancelled()).toBe(true);
  });
});
