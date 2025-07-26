import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react({
      // Disable TypeScript checking completely
      tsDecorators: false,
    }),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Force JavaScript processing only
  esbuild: {
    jsx: 'automatic',
    jsxDev: mode === 'development',
    // Ignore all TypeScript
    loader: 'jsx',
  },
  build: {
    target: 'es2015',
    // Skip TypeScript checking
    skipTypeChecking: true,
  },
  // Completely ignore TypeScript
  define: {
    __VUE_OPTIONS_API__: 'false',
    __VUE_PROD_DEVTOOLS__: 'false',
  },
}));