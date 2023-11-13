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
      entry: "./src/modules.ts",
      name: "NeuronGSM",
      fileName: "modules",
    },
    rollupOptions: {
      external: ["../../persist", "../../core", "../../vanilla"],
      output: [
        {
          dir: "./dist/",
          name: "modules",
          entryFileNames: "modules.js",
        },
        {
          dir: "./dist/",
          name: "modules",
          format: "cjs",
          entryFileNames: "modules.cjs",
        },
        {
          dir: "./dist/umd/",
          name: "modules",
          format: "umd",
          entryFileNames: "modules.js",
        },
        {
          dir: "./dist/esm/",
          name: "modules",
          format: "esm",
          entryFileNames: "modules.js",
        },
        {
          dir: "./dist/iife/",
          name: "modules",
          format: "iife",
          entryFileNames: "modules.js",
        },
        {
          dir: "./dist/system/",
          name: "modules",
          format: "system",
          entryFileNames: "modules.js",
        },
      ],
    },
  },
  plugins: [],
});
