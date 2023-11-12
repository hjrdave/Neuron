import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  build: {
    minify: true,
    emptyOutDir: false,
    outDir: "dist/",
    sourcemap: true,
    lib: {
      entry: "./src/vanilla.ts",
      name: "NeuronGSM",
      fileName: "vanilla",
    },
    rollupOptions: {
      output: [
        {
          dir: "./dist/",
          name: "vanilla",
          entryFileNames: "vanilla.js",
        },
        {
          dir: "./dist/",
          name: "vanilla",
          format: "cjs",
          entryFileNames: "vanilla.cjs",
        },
        {
          dir: "./dist/umd/",
          name: "vanilla",
          format: "umd",
          entryFileNames: "vanilla.js",
        },
        {
          dir: "./dist/esm/",
          name: "vanilla",
          format: "esm",
          entryFileNames: "vanilla.js",
        },
        {
          dir: "./dist/iife/",
          name: "vanilla",
          format: "iife",
          entryFileNames: "vanilla.js",
        },
        {
          dir: "./dist/system/",
          name: "vanilla",
          format: "system",
          entryFileNames: "vanilla.js",
        },
      ],
    },
  },
  plugins: [],
});
