/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/*',
    '!src/common/constants/env.ts',
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jest-environment-jsdom',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}
