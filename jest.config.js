module.exports = {
  clearMocks: true,
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
