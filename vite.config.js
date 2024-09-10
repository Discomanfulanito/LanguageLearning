import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, './src/index.html'),
      },
    },
  },
  publicDir: 'public',
  base: './',
  server: {
    port: 3000,
    open: true,
    host: true,
  },
  esbuild: false,
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
    },
  },
})