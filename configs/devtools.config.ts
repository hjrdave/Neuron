import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react";
import { topConfig } from "./baseConfigs";

export default defineConfig({
  ...topConfig,
  build: {
    minify: true,
    emptyOutDir: false,
    outDir: "dist/",
    sourcemap: true,
    lib: {
      entry: "./src/modules/devtools",
      name: "Devtools",
      fileName: "devtools",
    },
    rollupOptions: {
      external: ["../../vanilla", "../../DevtoolsPanel", "react"],
      output: [
        {
          dir: "./dist/modules/devtools",
          name: "devtools",
          entryFileNames: "[name].js",
          globals: {
            react: "React",
          },
        },
        {
          dir: "./dist/modules/devtools",
          name: "devtools",
          format: "cjs",
          entryFileNames: "[name].cjs",
          globals: {
            react: "React",
          },
        },
      ],
    },
  },
  plugins: [react({ jsxRuntime: "classic" })],
});
