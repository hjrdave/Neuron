/// <reference types="vitest" />
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  build: {
    minify: true,
    outDir: "../package/dist/",
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: "./devtools/index.tsx",
      name: "NeuronDevtools",
      fileName: "index",
    },
    rollupOptions: {
      output: [
        {
          dir: "../package/dist/devtools/",
          name: "index",
          entryFileNames: "index.js",
        },
        {
          dir: "../package/dist/devtools/",
          name: "index",
          format: "cjs",
          entryFileNames: "index.cjs",
        },
        {
          dir: "../package/dist/devtools/umd/",
          name: "index",
          format: "umd",
          entryFileNames: "index.js",
        },
        {
          dir: "../package/dist/devtools/esm/",
          name: "index",
          format: "esm",
          entryFileNames: "index.js",
        },
        {
          dir: "../package/dist/devtools/iife/",
          name: "index",
          format: "iife",
          entryFileNames: "index.js",
        },
        {
          dir: "../package/dist/devtools/system/",
          name: "index",
          format: "system",
          entryFileNames: "index.js",
        },
      ],
    },
  },
  plugins: [dts({ rollupTypes: true }), cssInjectedByJsPlugin(), react()],
});
