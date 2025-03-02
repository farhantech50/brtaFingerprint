import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  server: {
    host: "192.168.78.159", // Make the server accessible on all network interfaces
    port: 3000, // Change the port if necessary
  },
  plugins: [react()],
});
