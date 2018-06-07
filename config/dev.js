// Rollup plugins.
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife',
    name: 'Daily'
  },
  plugins: [
    babel({
      exclude: 'node_modules/**'
    }),
    cjs({
      exclude: 'node_modules/process-es6/**',
      include: [
        'node_modules/preact/**'
      ]
    }),
    globals(),
    replace({ 'process.env.NODE_ENV': JSON.stringify('development') }),
    resolve({
      browser: true,
      main: true
    })
  ],
  sourcemap: true
}
