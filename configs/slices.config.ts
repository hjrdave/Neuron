import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist/modules/slices/",
    lib: {
      entry: "./src/slices.ts",
      name: "Slices",
      fileName: "index",
    },
    rollupOptions: {
      external: ["../../core"],
      output: {},
    },
  },
});
