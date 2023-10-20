// vite.config.js
//import { resolve } from "path";
import { defineConfig } from "vite";

//const outputDir = "dist";
//const input = "src/Core/index.ts";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/Core/index.ts",
      name: "NeuronGSM",
      fileName: "index",
    },
    rollupOptions: {
      output: {
        dir: `dist/neurongsm`,

        //format: "esm",
        //exports: "named",
      },
    },
  },
});
