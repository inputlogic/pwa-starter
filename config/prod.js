// Rollup plugins.
import replace from 'rollup-plugin-replace'
import { uglify } from 'rollup-plugin-uglify'
// import compiler from '@ampproject/rollup-plugin-closure-compiler'

// Import the development configuration.
import config from './dev'

// Inject the production settings.
// config.output.file = 'public/bundle.js'
config.plugins[3] = replace({ 'process.env.NODE_ENV': JSON.stringify('production') })
// config.plugins.push(compiler())
config.plugins.push(uglify({
  mangle: false
}))

export default config
