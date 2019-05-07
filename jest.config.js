"use strict";

module.exports = {
  testMatch: [
    "**/unit/specs/**/*spec.js",
    "**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)"
  ],

  moduleFileExtensions: ["js", "vue", "jsx", "json"],

  moduleDirectories: [`node_modules`, `src`],

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },

  transform: {
    ".*\\.js$": "<rootDir>/node_modules/babel-jest",
    ".*\\.vue$": "<rootDir>/node_modules/vue-jest",
    "^.+\\.vue$": "vue-jest",
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
      "jest-transform-stub",
    "^.+\\.jsx?$": "babel-jest"
  },

  transformIgnorePatterns: ["node_modules", "/node_modules/"],

  collectCoverage: true,
  coverageDirectory: `./tests/unit/coverage`,
  coverageReporters: [`lcov`],
  coveragePathIgnorePatterns: [`/node_modules/`, `/build/`, `/dist/`, `/test/`],
  testURL: "http://localhost/",

  snapshotSerializers: ["jest-serializer-vue"],

  watchPlugins: [
    "jest-watch-typeahead/filename",
    "jest-watch-typeahead/testname"
  ],
  setupFiles: ["<rootDir>/.jest/register-context.js"]
};
