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
          dir: "./dist",
          name: "vanilla",
          entryFileNames: "[name].js",
        },
        {
          dir: "./dist",
          name: "vanilla",
          format: "umd",
          entryFileNames: "[name].js",
        },
        {
          dir: "./dist/esm",
          name: "vanilla",
          format: "esm",
          entryFileNames: "[name].js",
        },
        {
          dir: "./dist/iife",
          name: "vanilla",
          format: "iife",
          entryFileNames: "[name].js",
        },
        {
          dir: "./dist/system",
          name: "vanilla",
          format: "system",
          entryFileNames: "[name].js",
        },
      ],
    },
  },
  plugins: [dts()],
});
