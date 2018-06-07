const historyApiFallback = require('connect-history-api-fallback')
const browserSync = require('browser-sync').create()

// browser-sync start --s --index 'html/index-dev.html' --files 'html/**/*.html, build/**/*.js' --no-notify
browserSync.init({
  files: ['public/**/*.html', 'public/**/*.js'],
  server: {
    baseDir: './',
    index: 'public/index.html',
    middleware: [historyApiFallback({
      index: './public/index.html'
    })]
  },
  notify: false
})
