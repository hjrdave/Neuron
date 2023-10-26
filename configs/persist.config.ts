import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist/modules/persist/",
    lib: {
      entry: "./src/persist.ts",
      name: "Persist",
      fileName: "index",
    },
    rollupOptions: {
      external: ["../../core"],
      output: {},
    },
  },
  //plugins: [react()],
});
