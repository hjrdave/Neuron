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
      entry: "./package/shallow/index.ts",
      name: "NeuronShallow",
      fileName: "index",
    },
    rollupOptions: {
      external: ["../vanilla/Payload", "../vanilla"],
      output: [
        {
          dir: "./dist",
          name: "shallow",
          entryFileNames: "shallow.js",
        },
        {
          dir: "./dist",
          name: "shallow",
          format: "cjs",
          entryFileNames: "shallow.cjs",
        },
        {
          dir: "./dist/umd/",
          name: "shallow",
          format: "umd",
          entryFileNames: "shallow.js",
        },
        {
          dir: "./dist/esm/",
          name: "shallow",
          format: "esm",
          entryFileNames: "shallow.js",
        },
        {
          dir: "./dist/iife/",
          name: "shallow",
          format: "iife",
          entryFileNames: "shallow.js",
        },
        {
          dir: "./dist/system/",
          name: "shallow",
          format: "system",
          entryFileNames: "shallow.js",
        },
      ],
    },
  },
  plugins: [dts()],
});
