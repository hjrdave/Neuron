import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export const foo = defineConfig({
  build: {
    outDir: "dist/",
    lib: {
      entry: "./src/",
      name: "NeuronGSM",
      fileName: "index",
    },
    rollupOptions: {
      output: {},
    },
  },
  plugins: [react()],
});
