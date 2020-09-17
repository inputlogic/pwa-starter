const { readFileSync, writeFileSync } = require('fs')
const less = require('less')
const lessGlob = require('less-plugin-glob')

const index = 'src/styles/index.less'
const out = 'public/bundle.css'
const opts = {
  paths: ['./src/styles/'],
  plugins: [lessGlob]
}

try {
  const styles = readFileSync(index, 'utf8')
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
