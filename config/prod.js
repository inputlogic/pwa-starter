import replace from '@rollup/plugin-replace'
import { terser } from 'rollup-plugin-terser'

import baseConfig from './base'

const prodConfig = Object.assign({}, baseConfig)

prodConfig.output = prodConfig.output.map(cfg => ({
  ...cfg,
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

export default prodConfig
