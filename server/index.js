const sirv = require('sirv')
const polka = require('polka')
const compress = require('compression')()

const port = process.env.PORT || 5000

// Init `sirv` handler
const assets = sirv('public', {
  immutable: false
})

const ssr = (req, res, next) => {
  const state = {}
  res.end(`<!doctype html>
    <html lang="en">
      <head>
        <base href="/">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
        <link rel="stylesheet" href="./bundle.css?nosafaricache=123123" />
      </head>
      <body>
        <div class='main-app-container'></div>
        <script>window.__initial_store__ = ${JSON.stringify(state)};</script>
        <script src="./bundle.js?nosafaricache=123123"></script>
      </body>
    </html>`)
}

polka()
  .use(compress, assets, ssr)
  .listen(port)
  .then(() => {
    console.log(`> Ready on http://localhost:${port}`)
  })
