/* eslint import/no-default-export: 0 */

import { resolve as pathResolve } from 'path'
import { readFile, writeFile } from 'fs'

import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'

import baseConfig from './base'

const timestamp = (new Date()).getTime()
const prodConfig = Object.assign({}, baseConfig)

prodConfig.output = prodConfig.output.map(cfg => ({
  ...cfg,
  entryFileNames: `${timestamp}-[name].js`,
  sourcemap: false
}))

prodConfig.plugins.push(replace({ __ENV__: 'production' }))

prodConfig.plugins.push(terser({
  keep_fnames: true,
  keep_classnames: true,
  output: {
    comments: (node, comment) => {
      const text = comment.value
      const type = comment.type
      if (type === 'comment2') {
        // multiline comment
        return /@preserve|@license|@cc_on/i.test(text)
      }
    }
  }
}))

prodConfig.plugins.push(cacheBuster({
  filename: 'index.js',
  cssFilename: 'bundle.css',
  count: prodConfig.output.length,
  uid: timestamp
}))

export default prodConfig

/**
 * Custom cache-buster plugin.
 */
function cacheBuster ({ filename, cssFilename, count, uid }) {
  let c = 0
  const jsRe = new RegExp(filename, 'g')
  const cssRe = new RegExp(cssFilename, 'g')
  return {
    name: 'cache-buster',
    writeBundle (opts) {
      c++
      if (c === count) {
        return new Promise((resolve, reject) => {
          const file = pathResolve('public', 'index.html')
          readFile(file, 'utf8', (err, data) => {
            if (err) return console.log(err)
            const out = data
              .replace(jsRe, `${uid}-${filename}`)
              .replace(cssRe, `${cssFilename}?${uid}`)
            writeFile(file, out, (err) => {
              if (err) return console.log(err)
            })
          })
        })
      }
      return null
    }
  }
}
