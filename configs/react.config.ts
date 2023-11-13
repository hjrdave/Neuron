import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

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
      entry: "./src/react.ts",
      name: "NeuronGSM",
      fileName: "react",
    },
    rollupOptions: {
      external: ["react"],
      output: [
        {
          dir: "./dist/",
          name: "react",
          entryFileNames: "[name].js",
          globals: {
            react: "React",
          },
        },
        {
          dir: "./dist/",
          name: "react",
          format: "cjs",
          entryFileNames: "[name].cjs",
          globals: {
            react: "React",
          },
        },
        {
          dir: "./dist/",
          name: "react",
          format: "umd",
          entryFileNames: "[name].js",
          globals: {
            react: "React",
          },
        },
        {
          dir: "./dist/esm/",
          name: "react",
          format: "esm",
          entryFileNames: "[name].js",
          globals: {
            react: "React",
          },
        },
        {
          dir: "./dist/iife/",
          name: "react",
          format: "iife",
          entryFileNames: "[name].js",
          globals: {
            react: "React",
          },
        },
        {
          dir: "./dist/system/",
          name: "react",
          format: "system",
          entryFileNames: "[name].js",
          globals: {
            react: "React",
          },
        },
      ],
    },
  },
  plugins: [react({ jsxRuntime: "classic" })],
});
