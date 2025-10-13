import { defineConfig } from 'vitest/config';
import angular from '@analogjs/vite-plugin-angular';
import path from 'path';

export default defineConfig({
  plugins: [angular()],
  resolve: {
    alias: [
      { find: '@test-setup', replacement: path.resolve(__dirname, 'src', 'test-setup.ts') },
      { find: '@models', replacement: path.resolve(__dirname, 'src', 'app', 'models') },
      { find: '@clients', replacement: path.resolve(__dirname, 'src', 'app', 'clients') },
      { find: '@stores', replacement: path.resolve(__dirname, 'src', 'app', 'stores') },
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
