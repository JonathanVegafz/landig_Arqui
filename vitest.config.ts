import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    coverage: {
      enabled: true,
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'html', 'lcov'],
      all: true,
  include: ['src/lib/**/*.ts'],
      exclude: [
        '**/*.d.ts',
        '**/*.test.ts',
        'src/lib/interactions/**',
        'src/lib/*loader.ts',
        'src/lib/**/*loader.ts',
        'src/lib/index.ts',
        'src/lib/static-image-map.ts',
        'src/lib/utils.ts',
        'src/lib/validations.ts'
      ],
      thresholds: {
        lines: 30,
        statements: 30,
        branches: 30,
        functions: 30,
      },
    },
  },
});
