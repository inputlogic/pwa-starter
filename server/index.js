const sirv = require('sirv')
const polka = require('polka')
const compress = require('compression')()

const DEV = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 5000

const assets = sirv('public', {
  maxAge: !DEV ? 31536000 : 0, // 1Y
  immutable: false
})

polka()
  .use(compress, assets)
  .listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
