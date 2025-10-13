import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import path from 'path';

export default defineConfig({
  plugins: [angular()],
  resolve: {
    alias: [
      { find: '@test-setup', replacement: path.resolve(__dirname, 'src', 'test-setup.ts') }
    ],
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['src/test-setup.ts'],
    include: ['src/**/*.spec.ts'],
    coverage: { reporter: ['text','lcov'] },
  },
});
