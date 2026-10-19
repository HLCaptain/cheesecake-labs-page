import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Cloudflare provides the SPA fallback required for history routing. The
// GitHub Pages mirror and ordinary local builds retain their existing hashes.
const historyRouting = process.env.CF_PAGES === '1'

export default defineConfig({
  plugins: [react()],
  base: historyRouting ? '/' : './',
  define: {
    'import.meta.env.VITE_ROUTER_MODE': JSON.stringify(historyRouting ? 'history' : 'hash'),
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
})
