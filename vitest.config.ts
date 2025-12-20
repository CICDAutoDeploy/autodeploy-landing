import { defineConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default defineConfig({
  ...viteConfig,
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    globals: true,
    include: ['src/test/**/*.{test,spec}.?(c|m)[jt]s?(x)'],
    exclude: [
      'node_modules/**',
      '.git/**',
      'dist/**',
    ],
  },
});
