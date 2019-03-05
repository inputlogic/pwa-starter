import path from 'path'
// import livereload from 'rollup-plugin-livereload'
import serve from 'rollup-plugin-serve'
import baseConfig from './base'

const devConfig = Object.assign({}, baseConfig)

const dir = path.resolve(__dirname, '../public')

devConfig.plugins.push(serve(dir))
// devConfig.plugins.push(livereload(dir))

export default devConfig
