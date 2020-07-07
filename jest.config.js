module.exports = {
  verbose: false,
  bail: true,
  setupFiles: [
    './tests-setup.js'
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy',
    '^react$': 'preact/compat',
    '^react-dom$': 'preact/compat',
    '^react-dom/test-utils$': 'preact/test-utils'
  },
  // Let babel transpile certain node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(@app-elements|@wasmuth)/)'
  ]
}
