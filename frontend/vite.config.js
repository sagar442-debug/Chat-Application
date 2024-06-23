import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000", // Fixed the URL prefix
        changeOrigin: true, // Ensures the origin of the host header matches the target URL
        secure: false, // Use true if your target server uses HTTPS
        // Optionally, rewrite the URL path if your API requires it
        // rewrite: (path) => path.replace(/^\/api/, '')
      },
    },
  },
});
