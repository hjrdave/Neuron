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
      entry: "./package/persist/index.ts",
      name: "NeuronPersist",
      fileName: "index",
    },
    rollupOptions: {
      external: ["../core"],
      output: [
        {
          dir: "./dist",
          name: "persist",
          entryFileNames: "persist.js",
        },
        {
          dir: "./dist",
          name: "persist",
          format: "cjs",
          entryFileNames: "persist.cjs",
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
