import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    watch: false,
    setupFiles: ['vitest.setup.js'],
    include: ['src/**/?(*.)test.ts?(x)'],
  },
});
