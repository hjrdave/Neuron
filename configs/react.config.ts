import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  build: {
    outDir: "dist/react/",
    lib: {
      entry: "./src/react.ts",
      name: "NeuronGSM",
      fileName: "index",
    },
    rollupOptions: {
      external: ["../core", "../slices", "react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
  plugins: [react({ jsxRuntime: "classic" })],
});
