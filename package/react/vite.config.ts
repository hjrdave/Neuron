/// <reference types="vitest" />
import { defineConfig } from "vite";
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
      entry: "src/index.ts",
      name: "NeuronReact",
      fileName: "index",
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        "@sandstack/neuron",
        "sandstack/neuron-slices",
      ],
      output: [
        {
          dir: "./dist/",
          name: "index",
          entryFileNames: "index.js",
          globals: {
            react: "React",
          },
        },
        {
          dir: "./dist/",
          name: "index",
          format: "cjs",
          entryFileNames: "index.cjs",
          globals: {
            react: "React",
          },
        },
        {
          dir: "./dist/umd/",
          name: "index",
          format: "umd",
          entryFileNames: "index.js",
          globals: {
            react: "React",
          },
        },
        {
          dir: "./dist/esm/",
          name: "index",
          format: "esm",
          entryFileNames: "index.js",
          globals: {
            react: "React",
          },
        },
        {
          dir: "./dist/iife/",
          name: "index",
          format: "iife",
          entryFileNames: "index.js",
          globals: {
            react: "React",
          },
        },
        {
          dir: "./dist/system/",
          name: "index",
          format: "system",
          entryFileNames: "index.js",
          globals: {
            react: "React",
          },
        },
      ],
    },
  },
  plugins: [dts({ rollupTypes: true }), react()],
});
