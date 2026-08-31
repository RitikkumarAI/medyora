import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (SSR entry wrapper)
    server: { entry: "server" },
  },
  build: {
    minify: "esbuild",
    cssMinify: "esbuild",
    target: "esnext",
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router-vendor': ['@tanstack/react-router'],
        },
      },
    },
  },
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
