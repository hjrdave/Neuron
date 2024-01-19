/// <reference types="vitest" />
import { defineConfig } from "vite";
//import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  build: {
    minify: true,
    outDir: "./dist/",
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: "./package/slices/index.ts",
      name: "NeuronSlices",
      fileName: "index",
    },
    rollupOptions: {
      output: [
        {
          dir: "./dist",
          name: "slices",
          entryFileNames: "slices.js",
        },
        {
          dir: "./dist",
          name: "slices",
          format: "cjs",
          entryFileNames: "slices.cjs",
        },
        {
          dir: "./dist/umd/",
          name: "slices",
          format: "umd",
          entryFileNames: "slices.js",
        },
        {
          dir: "./dist/esm/",
          name: "slices",
          format: "esm",
          entryFileNames: "slices.js",
        },
        {
          dir: "./dist/iife/",
          name: "slices",
          format: "iife",
          entryFileNames: "slices.js",
        },
        {
          dir: "./dist/system/",
          name: "slices",
          format: "system",
          entryFileNames: "slices.js",
        },
      ],
    },
  },
  plugins: [dts()],
});
