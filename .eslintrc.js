module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'standard',
    "plugin:react-hooks/recommended",
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
    W: 'readonly',
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    }
  },
  plugins: [
    "babel",
    'import',
    "react",
    'react-hooks',
  ],
  rules: {
    'no-unused-vars': ['error', { 'vars': 'local', 'args': "none", 'argsIgnorePattern': '^_' }],
    'quote-props': 'off',
    'comma-dangle': ["error", "only-multiline"],
    'operator-linebreak': ['error', 'before'],
    'import/no-absolute-path': "off",
    'import/no-default-export': 'error',
    "react/no-string-refs": 2,
    "react/no-find-dom-node": 2,
    "react/no-is-mounted": 2,
    "react/jsx-no-comment-textnodes": 2,
    "react/jsx-curly-spacing": 2,
    "react/jsx-no-undef": 2,
    "react/jsx-uses-react": 2,
    "react/jsx-uses-vars": 2,
    quotes: "off"
  },
  settings: {
    react: {
      pragma: "h",
      version: "preact",
    },
  },
}
