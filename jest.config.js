// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  verbose: true,
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: '.',
  testRegex: '.spec.ts$',
  coverageThreshold: {
    global: {
      functions: 79,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/**/*.ts',
    '**/**/test/**',
    '!**/test/**',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/coverage/**',
    '!dist/**',
    '!jest.config.js',
    '!**/test/**',
    '!test/**',
  ],
  coverageReporters: ['text', 'text-summary'],
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  coverageDirectory: './coverage',
  testEnvironment: 'node',
  roots: ['<rootDir>/apps/', '<rootDir>/libs/'],
  moduleNameMapper: {
    '@app/football-fixtures/(.*)': '<rootDir>/apps/football-fixtures/src/$1',
    '@app/football-fixtures': '<rootDir>/apps/football-fixtures/src',
    '@app/common/(.*)': '<rootDir>/libs/common/src/$1',
    '@app/common': '<rootDir>/libs/common/src',
  },
  setupFilesAfterEnv: ['jest-extended', './libs/common/tests/setup.testing.ts'],
};
