const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jsdom', // 👈 important !
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}


module.exports = createJestConfig(customJestConfig);
