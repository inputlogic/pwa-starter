#!/usr/bin/env node

const { resolve } = require('path')
const { writeFile, stat } = require('fs')

const DIR = 'src/modals'

// $ npm run init-modal MyModal
if (require.main === module) {
  if (process.argv.length < 3) {
    console.log('Please provide a name for your new Modal.')
    process.exit(1)
  }

  let name = process.argv[process.argv.length - 1]
  if (!name.toLowerCase().includes('modal')) {
    name = `${name}Modal`
  }

  if (!/^[$A-Z_][0-9A-Z_$]*$/i.test(name)) {
    console.log('Please provide a proper identifier for your Modal.')
    process.exit(1)
  }

  const file = resolve(DIR, `${name}.js`)
  const content = `import Modal from '@app-elements/modal'

export function ${name} () {
  return (
    <Modal>
      <h1>${name}</h1>
    </Modal>
  )
}

export default ${name}`

  stat(file, (err, res) => {
    if (err == null) {
      console.log(`File exists: ${file}`)
      process.exit(1)
    } else if (err.code === 'ENOENT') {
      writeFile(file, content + '\n', (err) => {
        if (err) throw err
        console.log(`Created ${DIR}/${name}.js`)
      })
    }
  })
}
