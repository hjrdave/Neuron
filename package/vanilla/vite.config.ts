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
      entry: "./package/index.ts",
      name: "Neuron",
      fileName: "index",
    },
    rollupOptions: {
      output: [
        {
          dir: "./dist/vanilla",
          name: "vanilla",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/vanilla",
          name: "vanilla",
          format: "cjs",
          entryFileNames: "index.cjs",
          exports: "named",
        },
        {
          dir: "./dist/vanilla/umd",
          name: "vanilla",
          format: "umd",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/vanilla/esm",
          name: "vanilla",
          format: "esm",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/vanilla/iife",
          name: "vanilla",
          format: "iife",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/vanilla/system",
          name: "vanilla",
          format: "system",
          entryFileNames: "index.js",
        },
      ],
    },
  },
  plugins: [dts()],
});
