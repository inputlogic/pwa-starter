import W from 'wasmuth'

const environments = {
  test: /^localhost$/,
  development: /^localhost:\d{4}$/,
  staging: /netlify\.app$/,
  production: ['pwa-starter.com', 'www.pwa-starter.com']
}

export const environment = (() => {
  const host = window.location.host
  const current = W.find(
    (env) => W.toType(environments[env]) === 'array'
      ? W.some(isMatch(host), environments[env])
      : isMatch(host)(environments[env]),
    Object.keys(environments)
  )
  if (!current) {
    throw new Error('No environment matching current url: ' + window.location)
  }
  return current
})()

function isMatch (source) {
  return (input) => {
    const type = W.toType(input)
    if (type === 'string') {
      return input === source
    } else if (type === 'regexp') {
      return input.test(source)
    }
    return false
  }
}
