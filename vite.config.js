import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
  },
  server: {
    open: true,
  },
  resolve: {
    alias: {
      '~': '/src',
    },
  },
});