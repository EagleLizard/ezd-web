
// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
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

export default defineConfig((config) => {
  const env = loadEnv(config.mode, process.cwd());
  console.log(env);
  return {
    define: {
      'import.meta.env.VITE_EZD_API_BASE_URL': `'${env.VITE_EZD_API_BASE_URL}'`,
    },
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
    test: {
      root: '.',
      environment: 'jsdom',
      include: [
        './**/*.{test,spec}.{js,ts,jsx,tsx}',
      ],
      reporters: [
        'default',
        'junit',
      ],
      outputFile: {
        junit: './test-reports/junit.xml',
      },
      coverage: {
        include: [
          './**/*.{js,ts,jsx,tsx}',
        ],
        exclude: [
          
        ],
        all: true,
        provider: 'istanbul',
        reporter: [
          'text',
          'cobertura',
          'html',
        ]
      }
    },
  };
});
