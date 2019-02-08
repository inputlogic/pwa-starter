import { resolve as pathResolve } from 'path'

import alias from 'rollup-plugin-alias'
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import css from 'rollup-plugin-css-only'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'

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
      include: ['src/**', 'server/**', 'node_modules/@app-elements/**']
    }),
    cjs({
      exclude: [
        'node_modules/process-es6/**'
      ],
      include: [
        'node_modules/preact/**',
        'node_modules/preact-portal/**',
        'node_modules/atom/**'
      ]
    }),
    resolve({
      browser: false,
      modulesOnly: false // Default: false
    }),
    globals(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    alias({
      react: pathResolve(
        __dirname,
        '../node_modules/preact/src/preact.js'
      )
    })
  ]
}
