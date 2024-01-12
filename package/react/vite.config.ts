/// <reference types="vitest" />
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

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
      entry: "./react/index.ts",
      name: "Neuron",
      fileName: "index",
    },
    rollupOptions: {
      external: ["react", "../vanilla", "../slices"],
      output: [
        {
          dir: "../package/dist/react/",
          name: "index",
          entryFileNames: "index.js",
        },
        {
          dir: "../package/dist/react/",
          name: "index",
          format: "cjs",
          entryFileNames: "index.cjs",
        },
        {
          dir: "../package/dist/react/umd/",
          name: "index",
          format: "umd",
          entryFileNames: "index.js",
        },
        {
          dir: "../package/dist/react/esm/",
          name: "index",
          format: "esm",
          entryFileNames: "index.js",
        },
        {
          dir: "../package/dist/react/iife/",
          name: "index",
          format: "iife",
          entryFileNames: "index.js",
        },
        {
          dir: "../package/dist/react/system/",
          name: "index",
          format: "system",
          entryFileNames: "index.js",
        },
      ],
    },
  },
  plugins: [dts({ rollupTypes: true }), tsconfigPaths(), react()],
});
