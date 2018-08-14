// Rollup plugins.
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import css from 'rollup-plugin-css-only'
// import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'server/index.js',
  output: {
    file: 'server/bundle.js',
    format: 'cjs'
    // name: 'Server'
  },
  plugins: [
    css({
      include: ['**/*.less'],
      output: function (styles, styleNodes) {
        console.log('no css')
      }
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    cjs({
      exclude: 'node_modules/process-es6/**',
      include: [
        'node_modules/preact/**',
        'node_modules/preact-helmet/**',
        'node_modules/preact-portal/**'
      ]
    })
  ]
}
