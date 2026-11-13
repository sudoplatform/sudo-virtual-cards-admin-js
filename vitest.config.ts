import { defineConfig } from 'vitest/config'

export default defineConfig({
  server: {
    sourcemapIgnoreList: (sourcePath) => sourcePath.includes('node_modules'),
  },
  test: {
    globals: true,
    reporters: ['verbose'],
    // Node for all tests - Node 22 provides native fetch, crypto,
    // TextEncoder/TextDecoder, so jsdom is not required.
    environment: 'node',
    include: ['src/**/*.test.ts', 'test/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/lib/**', '**/cjs/**', '**/types/**'],
    setupFiles: ['./vitest.setup.ts'],
    clearMocks: true,
    coverage: {
      provider: 'v8',
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.test.ts', '**/*.d.ts', 'node_modules/**'],
      reporter: ['text', 'json-summary', 'lcov'],
      reportsDirectory: './coverage',
      thresholds: {
        statements: 85,
        branches: 0,
        functions: 85,
        lines: 85,
      },
    },
  },
})
