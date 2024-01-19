/// <reference types="vitest" />
import { defineConfig } from "vite";
// import tsconfigPaths from "vite-tsconfig-paths";
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
          name: "vanilla",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist",
          name: "vanilla",
          format: "cjs",
          entryFileNames: "index.cjs",
        },
        {
          dir: "./dist",
          name: "vanilla",
          entryFileNames: "vanilla.js",
        },
        {
          dir: "./dist",
          name: "vanilla",
          format: "cjs",
          entryFileNames: "vanilla.cjs",
          exports: "named",
        },
        {
          dir: "./dist/umd",
          name: "vanilla",
          format: "umd",
          entryFileNames: "vanilla.js",
        },
        {
          dir: "./dist/esm",
          name: "vanilla",
          format: "esm",
          entryFileNames: "vanilla.js",
        },
        {
          dir: "./dist/iife",
          name: "vanilla",
          format: "iife",
          entryFileNames: "vanilla.js",
        },
        {
          dir: "./dist/system",
          name: "vanilla",
          format: "system",
          entryFileNames: "vanilla.js",
        },
      ],
    },
  },
  plugins: [dts()],
});
