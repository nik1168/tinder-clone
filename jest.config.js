module.exports = {
  preset: 'jest-expo',
  verbose: true,
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    window: {},
  },
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  moduleNameMapper: {
    '\\.svg': '<rootDir>/__mocks__/svg-mock.js',
    '\\.png': '<rootDir>/__mocks__/png-mock.js',
  },
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?@react-native|react-native|@react-native-picker/picker|@react-navigation|react-navigation|@react-native-community|@sentry/react-native|@react-native-firebase/messaging|@invertase/react-native-apple-authentication|expo(nent)?|@expo(nent)?/.*|@unimodules/.*|unimodules|jest-expo|@aaqua/autocomplete)',
  ],
  coveragePathIgnorePatterns: ['.generated.ts'],
  setupFiles: ['./jest.setup.js'],
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  testEnvironment: 'jsdom', // https://github.com/facebook/jest/issues/4359#issuecomment-506735229
};
