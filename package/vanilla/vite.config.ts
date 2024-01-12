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
    outDir: "../package/dist/",
    sourcemap: true,
    emptyOutDir: false,
    lib: {
      entry: "./vanilla/index.ts",
      name: "Neuron",
      fileName: "index",
    },
    rollupOptions: {
      output: [
        {
          dir: "../package/dist",
          name: "index",
          entryFileNames: "index.js",
        },
        {
          dir: "../package/dist",
          name: "index",
          format: "cjs",
          entryFileNames: "index.cjs",
        },
        {
          dir: "../package/dist/vanilla/umd/",
          name: "index",
          format: "umd",
          entryFileNames: "index.js",
        },
        {
          dir: "../package/dist/vanilla/esm/",
          name: "index",
          format: "esm",
          entryFileNames: "index.js",
        },
        {
          dir: "../package/dist/vanilla/iife/",
          name: "index",
          format: "iife",
          entryFileNames: "index.js",
        },
        {
          dir: "../package/dist/vanilla/system/",
          name: "index",
          format: "system",
          entryFileNames: "index.js",
        },
      ],
    },
  },
  plugins: [dts({ rollupTypes: true }), tsconfigPaths()],
});
