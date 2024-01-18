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
      entry: "./package/react.ts",
      name: "Neuron",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "../vanilla", "../slices"],
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
          dir: "./dist/react/umd/",
          name: "react",
          format: "umd",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/react/esm/",
          name: "react",
          format: "esm",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/react/iife/",
          name: "react",
          format: "iife",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/react/system/",
          name: "react",
          format: "system",
          entryFileNames: "index.js",
        },
      ],
    },
  },
  plugins: [dts(), react()],
});
