const nextJest = require("next/jest");

// Provide the path to your Next.js app to load next.config.js and .env files in your test environment
const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  testEnvironment: 'jsdom', // 👈 important !
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}


module.exports = createJestConfig(customJestConfig);
