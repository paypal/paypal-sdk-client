module.exports = {
  // extends: "@krakenjs/babel-config-grumbler/babelrc-browser",
  extends: "@krakenjs/babel-config-grumbler/babelrc-node",
  // presets: ["@krakenjs/babel-config-grumbler/flow-ts-babel-preset"],

  presets: ["@babel/env", ["@babel/typescript", { jsxPragma: "h" }]],
  plugins: [["@babel/transform-react-jsx", { pragma: "h" }]],
};
