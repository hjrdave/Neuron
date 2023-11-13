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
      entry: "./src/modules/persist",
      name: "Persist",
      fileName: "persist",
    },
    rollupOptions: {
      external: ["../../vanilla"],
      output: [
        {
          dir: "./dist/modules/persist",
          name: "persist",
          entryFileNames: "[name].js",
        },
        {
          dir: "./dist/modules/persist",
          name: "persist",
          format: "cjs",
          entryFileNames: "[name].cjs",
        },
        {
          dir: "./dist/umd/modules/persist",
          name: "persist",
          format: "umd",
          entryFileNames: "[name].js",
        },
        {
          dir: "./dist/esm/modules/persist",
          name: "persist",
          format: "esm",
          entryFileNames: "[name].js",
        },
        {
          dir: "./dist/iife/modules/persist",
          name: "persist",
          format: "iife",
          entryFileNames: "[name].js",
        },
        {
          dir: "./dist/system/modules/persist",
          name: "persist",
          format: "system",
          entryFileNames: "[name].js",
        },
      ],
    },
  },
  plugins: [],
});
