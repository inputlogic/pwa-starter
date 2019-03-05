import path from 'path'
import browsersync from 'rollup-plugin-browsersync'
import baseConfig from './base'

const devConfig = Object.assign({}, baseConfig)

const dir = path.resolve(__dirname, '../public')

devConfig.plugins.push(browsersync({ server: dir }))

export default devConfig
