/* eslint import/no-default-export: 0 */

import { resolve as pathResolve } from 'path'
import { writeFileSync } from 'fs'
import less from 'less'
import lessGlob from 'less-plugin-glob'

// Rollup plugins.
import alias from '@rollup/plugin-alias'
import babel from '@rollup/plugin-babel'
import cjs from '@rollup/plugin-commonjs'
import css from 'rollup-plugin-css-only'
import inject from '@rollup/plugin-inject'
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
    css({
      include: ['**/*.less', 'node_modules/@app-elements/**/*.less'],
      output: function (styles, styleNodes) {
        less
          .render(styles, { plugins: [lessGlob] })
          .then(output => {
            // output.css = string of css
            // output.map = string of sourcemap
            // output.imports = array of string filenames of the imports referenced
            writeFileSync('public/bundle.css', output.css)
          },
          error => console.log({ error }))
      }
    }),
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
        'node_modules/process-es6/**'
      ],
      include: [
        'node_modules/preact/**',
        'node_modules/prop-types/**',
        'node_modules/react-is/**',
        'node_modules/object-assign/**',
        'node_modules/autobind-decorator/**',
        'node_modules/warning/**',
        'node_modules/to-snake-case/**',
        'node_modules/debounce/**',
        'node_modules/atom/**'
      ]
    }),
    inject({
      // import { createElement } from 'react'
      createElement: ['react', 'createElement'],
      W: 'wasmuth'
    }),
    alias({
      entries: [
        {
          find: 'react',
          replacement: pathResolve(__dirname, '../node_modules/preact/compat/src/index.js')
        },
        {
          find: 'react-dom',
          replacement: pathResolve(__dirname, '../node_modules/preact/compat/src/index.js')
        }
      ]
    })
  ]
}
