import path from 'path'
import browsersync from 'rollup-plugin-browsersync'
import replace from 'rollup-plugin-replace'

import baseConfig from './base'

const devConfig = Object.assign({}, baseConfig)

const dir = path.resolve(__dirname, '../public')

devConfig.plugins.push(browsersync({
  open: false,
  server: dir,
  single: true // for client-side routing
}))

devConfig.plugins.push(replace({
  'process.env.NODE_ENV': JSON.stringify('development')
}))

export default devConfig
