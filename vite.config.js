import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  build: {
    rollupOptions: {
      external: ['react', 'react-dom'],
    },
  },
  plugins: [
    react({ devTarget: 'esnext' }),
    svgr(),
    tsconfigPaths(),
    checker({
      typescript: true,
    }),
  ],
  assetsInclude: ['*.svg'],
  test: {
    globals: true,
    environment: 'jsdom',
    watch: false,
    setupFiles: ['vitest.setup.js'],
    include: ['src/**/?(*.)test.ts?(x)'],
  },
});
