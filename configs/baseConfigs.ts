export const topConfig = {
  define: {
    "process.env.NODE_ENV": '"production"',
  },
  optimizeDeps: {
    exclude: ["stories/*"],
  },
};
