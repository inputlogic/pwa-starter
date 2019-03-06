import compiler from '@ampproject/rollup-plugin-closure-compiler'
import baseConfig from './base'

const prodConfig = Object.assign({}, baseConfig)

prodConfig.output = prodConfig.output.map(cfg => ({
  ...cfg,
  sourcemap: false
}))

prodConfig.plugins.push(compiler())

export default prodConfig
