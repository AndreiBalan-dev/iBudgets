import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  define: {
    "process.env": process.env,
    "import.meta.env.VITE_API_URL": JSON.stringify(process.env.VITE_API_URL),
    "import.meta.env.VITE_API_KEY": JSON.stringify(process.env.VITE_API_KEY),
  },
});
