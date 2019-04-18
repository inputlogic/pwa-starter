#!/usr/bin/env node

// const { resolve } = require('path')
// const { exec } = require('child_process')

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
  console.log({ name })
}
