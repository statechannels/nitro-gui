/* global module */
module.exports = {
  root: true,
  ignorePatterns: [
    "!.prettierrc.js",
    "**/!.eslintrc.js",
    "**/dist*/",
    "**/*__GENERATED__*",
    "**/build",
    "**/public",
    "**/.cache",
    "**/styles",
  ],
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint",
    "prettier",
    // We enforce certain rules on how imports are handled
    "import",
  ],
  extends: [
    "eslint:recommended",
    "plugin:prettier/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  rules: {
    "no-self-compare": "error",
    "import/order": [
      1,
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "always",
      },
    ],
  },
  overrides: [
    {
      files: ["**/*.ts"],
      extends: ["plugin:@typescript-eslint/recommended"],
      rules: {},
    },
    {
      files: ["./src/**/*.ts"],
      rules: {},
    },
  ],
};
