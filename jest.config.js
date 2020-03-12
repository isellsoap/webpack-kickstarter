const useJunitReporter = !!process.env['JEST_JUNIT_OUTPUT_DIR']

module.exports = {
  reporters: useJunitReporter ? ['jest-junit', 'default'] : ['default'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/file-mock.ts',
    '\\.css$': '<rootDir>/test/style-mock.ts',
  },
  setupFilesAfterEnv: ['<rootDir>/test/test-setup.ts'],
  // ignore typescript's compiled files
  testPathIgnorePatterns: ['dist/', 'build/'],
}
