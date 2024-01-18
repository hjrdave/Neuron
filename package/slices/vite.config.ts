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
      entry: "./package/slices.ts",
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
          dir: "./dist/slices/umd/",
          name: "slices",
          format: "umd",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/slices/esm/",
          name: "slices",
          format: "esm",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/slices/iife/",
          name: "slices",
          format: "iife",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/slices/system/",
          name: "slices",
          format: "system",
          entryFileNames: "index.js",
        },
      ],
    },
  },
  plugins: [dts()],
});
