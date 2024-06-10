/// <reference types="vitest" />
import { defineConfig } from "vite";
//import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

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
      entry: "./package/react/index.ts",
      name: "Neuron",
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "../vanilla",
        "../vanilla/Store",
      ],
      output: [
        {
          dir: "./dist",
          name: "react",
          entryFileNames: "react.js",
        },
        {
          dir: "./dist",
          name: "react",
          format: "cjs",
          entryFileNames: "react.cjs",
        },
        {
          dir: "./dist/umd/",
          name: "react",
          format: "umd",
          entryFileNames: "react.js",
        },
        {
          dir: "./dist/esm/",
          name: "react",
          format: "esm",
          entryFileNames: "react.js",
        },
        {
          dir: "./dist/iife/",
          name: "react",
          format: "iife",
          entryFileNames: "react.js",
        },
        {
          dir: "./dist/system/",
          name: "react",
          format: "system",
          entryFileNames: "react.js",
        },
      ],
    },
  },
  plugins: [dts(), react()],
});
