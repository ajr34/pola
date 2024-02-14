import { defineConfig } from 'vite';

export default defineConfig({
  base: '/pola/',
  optimizeDeps: {
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis',
      },
    },
  },
});
