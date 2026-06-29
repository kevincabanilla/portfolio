import { defineConfig } from "vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  server: {
    port: 8000,
    open: false,
  },
  base: "/",
  resolve: {
    alias: {
      // Always update the paths in tsconfig.app.json when updating this.
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      // "@components": fileURLToPath(new URL("./src/components", import.meta.url)), // Above will handle this automatically
    },
  },
});
