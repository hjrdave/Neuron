/// <reference types="vitest" />
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

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
      name: "ReactNeuron",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "../core"],
      output: [
        {
          dir: "./dist/react/",
          name: "react",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/react/",
          name: "react",
          format: "cjs",
          entryFileNames: "index.cjs",
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
