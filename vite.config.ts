import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { prerenderLocales } from "./scripts/prerender-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [react(), tailwindcss(), prerenderLocales()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
