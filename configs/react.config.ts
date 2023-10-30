import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";

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
      entry: "./src/react.ts",
      name: "NeuronGSM",
      fileName: "react",
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: [
        {
          dir: "./dist/",
          name: "react",
          entryFileNames: "[name].js",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
        {
          dir: "./dist/",
          name: "react",
          format: "umd",
          entryFileNames: "[name].js",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
        {
          dir: "./dist/esm/",
          name: "react",
          format: "esm",
          entryFileNames: "[name].js",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
        {
          dir: "./dist/iife/",
          name: "react",
          format: "iife",
          entryFileNames: "[name].js",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
        {
          dir: "./dist/system/",
          name: "react",
          format: "system",
          entryFileNames: "[name].js",
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
          },
        },
      ],
    },
  },
  plugins: [react({ jsxRuntime: "classic" })],
});
