import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

import react from "@vitejs/plugin-react";

// configuration of Vite
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
