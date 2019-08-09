import { environment } from '/util/environments'

export const DEBUG = typeof window !== 'undefined'
  ? (window.location.hostname.indexOf('local') > -1 || window.location.hostname.indexOf('192.168.1.90') > -1)
  : process.env.NODE_ENV !== 'production'

export const WEB_URL = (function () {
  const href = window.location.href
  const path = window.location.pathname
  if (path === '/') {
    return href.substring(0, href.length - 1)
  }
  return href.replace(path, '')
})()

const PROTOCOL = window.location.protocol

export const API_URL = {
  test: '',
  development: `${PROTOCOL}//pwa-starter-api-dev.herokuapp.com`,
  staging: `${PROTOCOL}//pwa-starter-api-dev.herokuapp.com`,
  production: `${PROTOCOL}//api.pwa-starter.co`
}[environment]

export const HEADLESS = navigator.userAgent === 'ReactSnap'

console.log({ environment, HEADLESS, WEB_URL, API_URL })
