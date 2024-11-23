import { describe, it, expect } from "vitest";
import { Module } from "../Module";

describe("Module", () => {
  it("should initialize with provided options", () => {
    const module = new Module({
      name: "TestModule",
      onInit: (payload) => payload.cancelDispatch(),
    });

    expect(module.name).toBe("TestModule");
    expect(module.onInit).toBeDefined();
  });

  it("should handle optional middleware gracefully", () => {
    const module = new Module({ name: "TestModule" });

    expect(module.name).toBe("TestModule");
    expect(module.onInit).toBeUndefined();
    expect(module.onDispatch).toBeUndefined();
    expect(module.onCallback).toBeUndefined();
  });
});
