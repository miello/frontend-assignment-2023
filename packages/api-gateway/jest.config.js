module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', '!src/*.ts'],
  coverageDirectory: 'coverage',
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.next/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
}
