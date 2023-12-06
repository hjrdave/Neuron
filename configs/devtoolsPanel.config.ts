import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react-swc";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";
import { topConfig } from "./baseConfigs";

export default defineConfig({
  ...topConfig,
  build: {
    minify: true,
    emptyOutDir: false,
    outDir: "dist/",
    sourcemap: true,
    lib: {
      entry: "./src/DevtoolsPanel.tsx",
      name: "DevtoolsPanel",
      fileName: "DevtoolsPanel",
    },
    rollupOptions: {
      //external: ["react", "react-dom", "../modules/persist"],
      output: [
        {
          dir: "./dist/",
          name: "DevtoolsPanel",
          entryFileNames: "[name].js",
          // globals: {
          //   react: "React",
          // },
        },
        {
          dir: "./dist/",
          name: "DevtoolsPanel",
          format: "cjs",
          entryFileNames: "[name].cjs",
          // globals: {
          //   react: "React",
          // },
        },
      ],
    },
  },
  plugins: [react(), cssInjectedByJsPlugin()],
});
