import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import path to resolve the directory

export default defineConfig(({ mode }) => {
  // Explicitly resolve the current directory using path.resolve
  const env = loadEnv(mode, path.resolve(), ""); 

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: "https://maps.googleapis.com",  // Accessing environment variables
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  };
});
