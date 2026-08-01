import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],

  // Ensures correct asset paths on Cloudflare Pages
  base: "/",

  // Optional: clean build output
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },

  // Optional: dev server config
  server: {
    port: 5173,
    open: true,
  }
});
