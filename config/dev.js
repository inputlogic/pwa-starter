import path from 'path'
// import browsersync from 'rollup-plugin-browsersync'
// import serve from 'rollup-plugin-serve'
// import livereload from 'rollup-plugin-livereload'
import dev from 'rollup-plugin-dev'

import baseConfig from './base'

const devConfig = Object.assign({}, baseConfig)

const dir = path.resolve(__dirname, '../public')

devConfig.plugins.push(
  dev({
    dirs: [dir],
    force: true,
    spa: './public/index.html',
    port: 3000
  })
)

export default devConfig
