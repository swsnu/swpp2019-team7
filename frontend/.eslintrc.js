module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb', 'plugin:react/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    "react/jsx-filename-extension": [0],
    "no-underscore-dangle": [0],
    "import/prefer-default-export": [0],
    "max-len": [1,  { "ignoreComments": true, "code": 200}],
    "react/prop-types": [0],
    "react/destructuring-assignment": [0],
    "react/jsx-no-bind": [0],
  },
};
