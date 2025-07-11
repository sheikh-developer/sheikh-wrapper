/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1", // Map @/ to root directory
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  testPathIgnorePatterns: ["/node_modules/", "/.next/"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
}
