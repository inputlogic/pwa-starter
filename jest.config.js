module.exports = {
  verbose: false,
  bail: true,
  setupFiles: [
    './tests-setup.js'
  ],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  // Let babel transpile certain node_modules
  transformIgnorePatterns: [
    'node_modules/(?!(@app-elements|@wasmuth)/)'
  ]
}
