import { resolve as pathResolve } from 'path'
import { readFileSync, writeFileSync } from 'fs'
import less from 'less'
import lessGlob from 'less-plugin-glob'

const out = 'public/bundle.css'
const opts = {
  paths: ['./src/styles/'],
  plugins: [lessGlob]
}

try {
  const styles = readFileSync('src/styles/index.less', 'utf8')
  less
    .render(styles, opts)
    .then(output => {
      // output.css = string of css
      // output.map = string of sourcemap
      // output.imports = array of string filenames of the imports referenced
      writeFileSync(out, output.css)
    },
    error => console.log({ error }))
} catch (err) {
  console.error(err)
}
