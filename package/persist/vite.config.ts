/// <reference types="vitest" />
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
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
      entry: "./package/persist/index.ts",
      name: "NeuronPersist",
      fileName: "index",
    },
    rollupOptions: {
      external: ["../core"],
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
          dir: "./dist/umd/",
          name: "persist",
          format: "umd",
          entryFileNames: "persist.js",
        },
        {
          dir: "./dist/esm/",
          name: "persist",
          format: "esm",
          entryFileNames: "persist.js",
        },
        {
          dir: "./dist/iife/",
          name: "persist",
          format: "iife",
          entryFileNames: "persist.js",
        },
        {
          dir: "./dist/system/",
          name: "persist",
          format: "system",
          entryFileNames: "persist.js",
        },
      ],
    },
  },
  plugins: [dts()],
});
