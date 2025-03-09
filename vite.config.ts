import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  base: "https://mtiller.github.io/template-renderer/",
  plugins: [react()],
});
