#!/usr/bin/env node

const { resolve } = require('path')
const { writeFile, mkdirSync, stat } = require('fs')

// $ npm run init-app admin-campaigns
if (require.main === module) {
  initApp()
}

async function initApp () {
  if (process.argv.length < 3) {
    console.log('Please provide a name for your new App.')
    process.exit(1)
  }

  let name = process.argv[process.argv.length - 1]

  if (!/^[a-z][0-9a-z-]*[a-z0-9]$/.test(name)) {
    console.log('Please provide a proper identifier for your App: All lowercase and dashes to separate words.')
    process.exit(1)
  }

  mkdirSync(
    resolve('src/apps', name, `${name}-page`),
    { recursive: true }
  )

  await createIndex(name)
  await createPage(name)
  await createStyle(name)

  console.log(`Created src/apps/${name}`)
  process.exit(0)
}

async function createIndex (name) {
  const reference = toCamel(name)
  const file = resolve('src/apps', name, 'index.js')
  const content = `import Router from '@app-elements/router'

import { ${reference}Page } from './${name}-page'

export const routes = {
  ${reference.charAt(0).toLowerCase() + reference.slice(1)}: {
    path: '/${name}',
    component: ${reference}Page
  }
}

export const ${reference}App = () =>
  <div>
    <Router routes={routes} />
  </div>

export default ${reference}App`

  return new Promise((resolve, reject) => {
    stat(file, (err, res) => {
      if (err == null) {
        reject(err)
        console.log(`File exists: ${file}`)
        process.exit(1)
      } else if (err.code === 'ENOENT') {
        writeFile(file, content + '\n', (err) => {
          if (err) throw err
          resolve(name)
        })
      }
    })
  })
}

async function createPage (name) {
  const reference = toCamel(name)
  const file = resolve('src/apps', name, `${name}-page`, 'index.js')
  const content = `import './${name}.less'

export const ${reference}Page = () =>
  <div>
    <h1>${reference}</h1>
  </div>

export default ${reference}Page`

  return new Promise((resolve, reject) => {
    stat(file, (err, res) => {
      if (err == null) {
        reject(err)
        console.log(`File exists: ${file}`)
        process.exit(1)
      } else if (err.code === 'ENOENT') {
        writeFile(file, content + '\n', (err) => {
          if (err) throw err
          resolve(name)
        })
      }
    })
  })
}

async function createStyle (name) {
  const file = resolve('src/apps', name, `${name}-page`, `${name}.less`)
  return new Promise((resolve, reject) => {
    stat(file, (err, res) => {
      if (err == null) {
        reject(err)
        console.log(`File exists: ${file}`)
        process.exit(1)
      } else if (err.code === 'ENOENT') {
        writeFile(file, '\n', (err) => {
          if (err) throw err
          resolve(name)
        })
      }
    })
  })
}

function toCamel (str) {
  let ret = ''
  let prevDash = false
  for (let s of str) {
    const isDash = s === '-'
    if (isDash) {
      prevDash = true
      continue
    }
    if (!isDash && prevDash) {
      ret += s.toUpperCase()
      prevDash = false
    } else {
      ret += s
    }
  }
  return ret.charAt(0).toUpperCase() + ret.slice(1)
}
