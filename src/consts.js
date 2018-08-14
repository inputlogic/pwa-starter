export const DEBUG = typeof window !== 'undefined'
  ? window.location.hostname.indexOf('local') > -1
  : process.env.NODE_ENV

export const WEB_URL = (function () {
  if (typeof window === 'undefined') {
    return 'https://cool-app.com'
  }
  return window.location.href.replace(window.location.pathname, '')
})()
