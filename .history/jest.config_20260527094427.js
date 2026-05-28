module.exports = {
  testEnvironment: "jsdom", // so React components can be tested
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // supports your tsconfig paths
  },
};
