/// <reference types="vitest" />
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
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
      entry: "./package/vanilla/index.ts",
      name: "Neuron",
      fileName: "index",
    },
    rollupOptions: {
      output: [
        {
          dir: "./dist",
          name: "index",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist",
          name: "index",
          format: "cjs",
          entryFileNames: "index.cjs",
          exports: "named",
        },
        {
          dir: "./dist/vanilla/umd",
          name: "index",
          format: "umd",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/vanilla/esm",
          name: "index",
          format: "esm",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/vanilla/iife",
          name: "index",
          format: "iife",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/vanilla/system",
          name: "index",
          format: "system",
          entryFileNames: "index.js",
        },
      ],
    },
  },
  plugins: [dts({ insertTypesEntry: true }), tsconfigPaths()],
});
