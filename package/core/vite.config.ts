/// <reference types="vitest" />
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  build: {
    minify: true,
    outDir: "./dist",
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: "./package/core/index.ts",
      name: "NeuronCore",
      fileName: "index",
    },

    rollupOptions: {
      output: [
        {
          dir: "./dist",
          name: "core",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist",
          name: "core",
          format: "cjs",
          entryFileNames: "index.cjs",
        },
        {
          dir: "./dist",
          name: "core",
          entryFileNames: "core.js",
        },
        {
          dir: "./dist",
          name: "core",
          format: "cjs",
          entryFileNames: "core.cjs",
          exports: "named",
        },
        {
          dir: "./dist/umd",
          name: "core",
          format: "umd",
          entryFileNames: "core.js",
        },
        {
          dir: "./dist/esm",
          name: "core",
          format: "esm",
          entryFileNames: "core.js",
        },
        {
          dir: "./dist/iife",
          name: "core",
          format: "iife",
          entryFileNames: "core.js",
        },
        {
          dir: "./dist/system",
          name: "core",
          format: "system",
          entryFileNames: "core.js",
        },
      ],
    },
  },
  plugins: [dts()],
});
