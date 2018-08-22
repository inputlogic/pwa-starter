import renderReact from './renderReact'

const sirv = require('sirv')
const polka = require('polka')
const compress = require('compression')()

const DEV = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 5000

const assets = sirv('public', {
  maxAge: !DEV ? 31536000 : 0, // 1Y
  immutable: false
})

const reloadScript = DEV
  ? `<script src="${process.env.BROWSER_REFRESH_URL}"></script>`
  : ''

const ssr = (req, res, next) => {
  console.log('ssr', req.url)
  renderReact(req.url)
    .then(({html, head, state}) => {
      res.end(`<!doctype html>
      <html lang="en">
        <head>
          <base href="/">
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
          <link rel="stylesheet" href="./bundle.css" />
          ${head}
        </head>
        <body>
          <div class='main-app-container'>${html}</div>
          <script>window.__initial_store__ = ${JSON.stringify(state)};</script>
          <script src="./bundle.js"></script>
          ${reloadScript}
        </body>
      </html>`)
    })
}

polka()
  .use(compress, assets, ssr)
  .listen(port)
  .then(() => {
    if (DEV & process.send) {
      process.send({event: 'online', url: `http://localhost:${port}/`})
    }
    console.log(`> Ready on http://localhost:${port}`)
  })
