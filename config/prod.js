import minify from 'rollup-plugin-babel-minify'

import baseConfig from './base'

const prodConfig = Object.assign({}, baseConfig)

prodConfig.output = prodConfig.output.map(cfg => ({
  ...cfg,
  sourcemap: false
}))

prodConfig.plugins.push(minify({
  comments: false,
  sourceMap: false,
  keepFnName: true,
  keepClassName: true
}))

export default prodConfig
