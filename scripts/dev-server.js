const sirv = require('sirv')
const polka = require('polka')
const compress = require('compression')()

const DEV = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 5000

const assets = sirv('public', {
  maxAge: !DEV ? 31536000 : 0, // 1Y
  immutable: false
})

const notFound = (req, res) => {
  const parts = req.url.split('.')
  if (parts.length === 1) {
    assets({ path: '/' }, res)
  } else {
    res.end()
  }
}

polka()
  .use(compress, assets, notFound)
  .listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
