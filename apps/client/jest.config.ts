import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', 
    '^.+\\.(js|jsx)$': 'babel-jest', 
  }
};

export default config;
