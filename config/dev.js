import {writeFileSync} from 'fs'
import less from 'less'

// Rollup plugins.
import babel from 'rollup-plugin-babel'
import cjs from 'rollup-plugin-commonjs'
import css from 'rollup-plugin-css-only'
import globals from 'rollup-plugin-node-globals'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'src/index.js',
  output: {
    file: 'public/bundle.js',
    format: 'iife',
    name: 'PWA'
  },
  plugins: [
    css({
      include: ['**/*.less'],
      output: function (styles, styleNodes) {
        less
          .render(styles, {})
          .then(output => {
            // output.css = string of css
            // output.map = string of sourcemap
            // output.imports = array of string filenames of the imports referenced
            writeFileSync('public/bundle.css', output.css)
          },
          error => console.log({error}))
      }
    }),
    babel({
      include: ['src/**', 'server/**', 'node_modules/@app-elements/**']
    }),
    cjs({
      exclude: 'node_modules/process-es6/**',
      include: [
        'node_modules/preact/**',
        'node_modules/preact-portal/**'
      ]
    }),
    globals(),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    resolve({
      browser: true,
      main: true
    })
  ]
}
