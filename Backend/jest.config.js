export default {
  testEnvironment: 'node',
  coverageProvider: 'v8',
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.js",
    "!**/node_modules/**",
    "!**/jest.config.js"
  ]
};