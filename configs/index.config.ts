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
      entry: "./src/vanilla.ts",
      name: "NeuronGSM",
      fileName: "index",
    },
    rollupOptions: {
      output: [
        {
          dir: "./dist/",
          name: "vanilla",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/",
          name: "vanilla",
          format: "cjs",
          entryFileNames: "index.cjs",
        },
        {
          dir: "./dist/umd/",
          name: "vanilla",
          format: "umd",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/esm/",
          name: "vanilla",
          format: "esm",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/iife/",
          name: "vanilla",
          format: "iife",
          entryFileNames: "index.js",
        },
        {
          dir: "./dist/system/",
          name: "vanilla",
          format: "system",
          entryFileNames: "index.js",
        },
      ],
    },
  },
  plugins: [
    dts({ exclude: ["./src/vanilla/tests", "./src/modules/slices/tests"] }),
  ],
});
