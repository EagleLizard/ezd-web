
// vite.config.ts
import { defineConfig } from 'vite'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'
import react from '@vitejs/plugin-react';
import path from 'path';
import vitePluginSvgr from 'vite-plugin-svgr';

const rootDir = [
  __dirname,
  'src',
].join(path.sep);

const outDir = [
  __dirname,
  'dist',
].join(path.sep);

// https://vitejs.dev/config/
export default defineConfig({
  root: rootDir, 
  plugins: [
    // ...,
    react(),
    TanStackRouterVite(),
    vitePluginSvgr(),
  ],
  assetsInclude: [
    '**/*.md',
  ],
  build: {
    sourcemap: true,
    outDir: outDir
  },
})