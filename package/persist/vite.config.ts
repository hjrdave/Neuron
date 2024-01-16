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
      entry: "./package/persist.ts",
      name: "NeuronPersist",
      fileName: "index",
    },
    rollupOptions: {
      external: ["../vanilla"],
      output: [
        {
          dir: "./dist/persist/",
          name: "persist",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/persist/",
          name: "persist",
          format: "cjs",
          entryFileNames: "index.cjs",
        },
        {
          dir: "./dist/persist/umd/",
          name: "persist",
          format: "umd",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/persist/esm/",
          name: "persist",
          format: "esm",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/persist/iife/",
          name: "persist",
          format: "iife",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/persist/system/",
          name: "persist",
          format: "system",
          entryFileNames: "index.js",
        },
      ],
    },
  },
  plugins: [dts()],
});
