module.exports = {
  testEnvironment: "jsdom", // so React components can be tested
  
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // supports your tsconfig paths
  },
};
