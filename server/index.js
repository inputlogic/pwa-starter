const sirv = require('sirv')
const polka = require('polka')
const compress = require('compression')()

const DEV = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || 5000

const assets = sirv('public', {
  maxAge: !DEV ? 31536000 : 0, // 1Y
  immutable: false
})

const ssr = (req, res, next) => {
  // renderReact(req.url)
  //   .then(({ html, head, state }) => {
  res.end(`<!doctype html>
    <html lang="en">
      <head>
        <base href="/">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <link rel="stylesheet" href="./bundle.css" />
      </head>
      <body>
        <div class='main-app-container'>Loading...</div>
        <script>window.__initial_store__ = "{}";</script>
        <script src="./bundle.js"></script>
      </body>
    </html>`)
}

polka()
  .use(compress, assets, ssr)
  .listen(port, err => {
    if (err) throw err
    console.log(`> Ready on http://localhost:${port}`)
  })
