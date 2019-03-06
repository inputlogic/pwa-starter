import { resolve as pathResolve } from 'path'
import { writeFileSync } from 'fs'
import less from 'less'

// Rollup plugins.
import alias from 'rollup-plugin-alias'
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import css from 'rollup-plugin-css-only'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
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
          .render(styles, {})
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
