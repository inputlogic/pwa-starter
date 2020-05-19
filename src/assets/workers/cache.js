/* global caches, fetch, self */
const CACHE = 'network-or-cache'

const precache = () =>
  caches
    .open(CACHE)
    .then(cache => cache.addAll([
      './index.html',
      './bundle.css',
      './module/index.js',
      './nomodule/index.js'
    ]))

self.addEventListener('install', (event) => {
  console.log('👷', 'install', event)
  event.waitUntil(precache())
})

self.addEventListener('activate', (event) => {
  console.log('👷', 'activate', event)
  return self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  // console.log('👷', 'fetch', event)
  event.respondWith(fetch(event.request))
})
