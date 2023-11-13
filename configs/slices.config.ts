import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  optimizeDeps: {
    exclude: ["stories"],
  },
  build: {
    minify: true,
    emptyOutDir: false,
    outDir: "dist/",
    sourcemap: true,
    lib: {
      entry: "./src/modules/slices",
      name: "Slices",
      fileName: "slices",
    },
    rollupOptions: {
      external: ["../../vanilla"],
      output: [
        {
          dir: "./dist/modules/slices",
          name: "slices",
          entryFileNames: "[name].js",
        },
        {
          dir: "./dist/modules/slices",
          name: "slices",
          format: "cjs",
          entryFileNames: "[name].cjs",
        },
        {
          dir: "./dist/umd/modules/slices",
          name: "slices",
          format: "umd",
          entryFileNames: "[name].js",
        },
        {
          dir: "./dist/esm/modules/slices",
          name: "slices",
          format: "esm",
          entryFileNames: "[name].js",
        },
        {
          dir: "./dist/iife/modules/slices",
          name: "slices",
          format: "iife",
          entryFileNames: "[name].js",
        },
        {
          dir: "./dist/system/modules/slices",
          name: "slices",
          format: "system",
          entryFileNames: "[name].js",
        },
      ],
    },
  },
  plugins: [],
});
