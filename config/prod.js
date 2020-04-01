import { resolve as pathResolve } from 'path'
import { readFile, writeFile } from 'fs'

import minify from 'rollup-plugin-babel-minify'

import baseConfig from './base'

const prodConfig = Object.assign({}, baseConfig)
const timestamp = (new Date()).getTime()

prodConfig.output = prodConfig.output.map(cfg => console.log(cfg) || ({
  ...cfg,
  entryFileNames: `${timestamp}-[name].js`,
  sourcemap: false
}))

prodConfig.plugins.push(minify({
  comments: false,
  sourceMap: false,
  keepFnName: true,
  keepClassName: true
}))

prodConfig.plugins.push(cacheBuster({
  count: prodConfig.output.length,
  uid: timestamp
}))

export default prodConfig

function cacheBuster ({ count, uid }) {
  let c = 0
  return {
    name: 'cache-buster',
    writeBundle (opts) {
      c++
      if (c === count) {
        return new Promise((resolve, reject) => {
          const filename = Object.keys(opts)[0]
          const file = pathResolve('public', 'index.html')
          readFile(file, 'utf8', (err, data) => {
            if (err) return console.log(err)
            writeFile(file, data.replace(/index\.js/g, filename), (err) => {
              if (err) return console.log(err)
            })
          })
        })
      }
      return null
    }
  }
}
