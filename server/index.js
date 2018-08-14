import renderReact from './renderReact'

const sirv = require('sirv')
const polka = require('polka')
const compress = require('compression')()

const port = process.env.PORT || 5000

const assets = sirv('public', {
  maxAge: 31536000, // 1Y
  immutable: false
})

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
        </body>
      </html>`)
    })
}

polka()
  .use(compress, assets, ssr)
  .listen(port)
  .then(() => {
    console.log(`> Ready on http://localhost:${port}`)
  })
