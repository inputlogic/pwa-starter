const sirv = require('sirv')
const polka = require('polka')
const compress = require('compression')()

const DEV = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 5000

const enforceHttps = (req, res, next) => {
  // The 'x-forwarded-proto' check is for Heroku
  const proto = req.headers['x-forwarded-proto']
  if (!req.secure && proto !== 'https' && process.env.NODE_ENV !== 'development') {
    res.writeHead(301, { Location: 'https://' + req.headers.host + req.url })
    res.end()
  } else {
    next()
  }
}

const assets = sirv('public', {
  maxAge: !DEV ? 31536000 : 0, // 1Y
  immutable: false
})

const notFound = (req, res) => {
  const parts = req.url.split('.')
  if (parts.length === 1) {
    assets({ path: '/', headers: req.headers }, res)
  } else {
    res.end()
  }
}

polka()
  .use(enforceHttps, compress, assets, notFound)
  .listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
