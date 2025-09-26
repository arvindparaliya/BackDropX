import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// Export Vite configuration with React and Tailwind plugins
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
