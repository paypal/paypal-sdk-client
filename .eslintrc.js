module.exports = {
  extends:
    "./node_modules/@krakenjs/eslint-config-grumbler/eslintrc-typescript.js",

  globals: {
    __TEST__: true,
  },

  rules: {
    "no-mixed-operators": "off",
    // off for initial ts conversion
    "@typescript-eslint/no-implicit-any-catch": "off",
    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unsafe-return": "off",
    "@typescript-eslint/no-base-to-string": "off",
    "@typescript-eslint/no-unsafe-argument": "off",
    "@typescript-eslint/no-unsafe-member-access": "off",
    "@typescript-eslint/no-unsafe-assignment": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/prefer-for-of": "off",

    "@typescript-eslint/no-unsafe-call": "off",
    "@typescript-eslint/no-unsafe-member-access": "off"
  },
};
