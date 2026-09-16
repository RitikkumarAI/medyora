import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  build: {
    target: "esnext",
    minify: true,
    cssMinify: true,
    chunkSizeWarningLimit: 800,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes("node_modules")) {
            if (id.includes("react/") || id.includes("react-dom/")) {
              return "vendor-react";
            }
            if (id.includes("@tanstack/")) {
              return "vendor-router";
            }
            if (id.includes("framer-motion")) {
              return "vendor-motion";
            }
            if (id.includes("lucide-react")) {
              return "vendor-icons";
            }
          }
          return undefined;
        },
      },
    },
  },
});
