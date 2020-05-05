import baseConfig from './base'

const prodConfig = Object.assign({}, baseConfig)

prodConfig.output = prodConfig.output.map(cfg => ({
  ...cfg,
  sourcemap: false
}))

export default prodConfig
