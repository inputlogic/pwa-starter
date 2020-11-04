/* eslint import/no-default-export: 0 */

import { resolve as pathResolve } from 'path'

// Rollup plugins.
import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import cjs from '@rollup/plugin-commonjs'
import inject from '@rollup/plugin-inject'
import replace from '@rollup/plugin-replace'
import resolve from '@rollup/plugin-node-resolve'

export default {
  input: 'src/index.js',
  preserveEntrySignatures: false,
  output: [
    // ES module version, for modern browsers
    {
      dir: 'public/module',
      format: 'es',
      sourcemap: true
    },
    // SystemJS version, for older browsers
    {
      dir: 'public/nomodule',
      format: 'system',
      sourcemap: true
    }
  ],
  plugins: [
    babel({
      babelHelpers: 'bundled',
      include: ['src/**', 'server/**', 'node_modules/@app-elements/form/**', 'node_modules/@app-elements/with-state/**']
    }),
    resolve({
      browser: false,
      modulesOnly: false // Default: false
    }),
    cjs({
      exclude: [
        // 'node_modules/process-es6/**'
      ],
      include: [
        'node_modules/atom/**',
        'node_modules/autobind-decorator/**',
        'node_modules/debounce/**',
        'node_modules/object-assign/**',
        'node_modules/preact/**',
        'node_modules/prop-types/**',
        'node_modules/scheduler/**',
        'node_modules/react/**',
        'node_modules/react-dom/**',
        'node_modules/react-is/**',
        'node_modules/to-snake-case/**',
        'node_modules/warning/**'
      ]
    }),
    inject({
      // import { createElement } from 'react'
      createElement: ['react', 'createElement'],
      W: 'wasmuth'
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    alias({
      entries: [
      ]
    })
  ]
}
