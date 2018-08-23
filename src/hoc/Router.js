import WithState from '/hoc/WithState'
import equal from '/util/equal'
import {setState, getState} from '/store'

const segmentize = (url) => {
  return url.replace(/(^\/+|\/+$)/g, '').split('/')
}

export const exec = (url, route) => {
  let reg = /(?:\?([^#]*))?(#.*)?$/
  let c = url.match(reg)
  let matches = {}
  let ret
  if (c && c[1]) {
    let p = c[1].split('&')
    for (let i = 0; i < p.length; i++) {
      let r = p[i].split('=')
      matches[decodeURIComponent(r[0])] = decodeURIComponent(r.slice(1).join('='))
    }
  }
  url = segmentize(url.replace(reg, ''))
  route = segmentize(route || '')
  let max = Math.max(url.length, route.length)
  for (let i = 0; i < max; i++) {
    if (route[i] && route[i].charAt(0) === ':') {
      let param = route[i].replace(/(^:|[+*?]+$)/g, '')
      let flags = (route[i].match(/[+*?]+$/) || {})[0] || ''
      let plus = ~flags.indexOf('+')
      let star = ~flags.indexOf('*')
      let val = url[i] || ''
      if (!val && !star && (flags.indexOf('?') < 0 || plus)) {
        ret = false
        break
      }
      matches[param] = decodeURIComponent(val)
      if (plus || star) {
        matches[param] = url.slice(i).map(decodeURIComponent).join('/')
        break
      }
    } else if (route[i] !== url[i]) {
      ret = false
      break
    }
  }
  if (ret === false) return false
  return matches
}

if (typeof window !== 'undefined') {
  document.addEventListener('click', ev => {
    if (ev.target.nodeName === 'A') {
      if (ev.metaKey) return
      ev.preventDefault()
      ev.stopImmediatePropagation()
      window.scrollTo(0, 0)
      const url = ev.target.getAttribute('href')
      window.history['pushState'](null, null, url)
      setState({currentPath: url})
    }
  })
}

export default ({routes}) =>
  <WithState mapper={({currentPath}) => ({currentPath})}>
    {({currentPath}) => {
      for (let route in routes) {
        if (routes[route].hasOwnProperty('routes')) {
          const shouldRender = Object
            .values(routes[route].routes)
            .some(({path}) => path && exec(currentPath, path))
          if (shouldRender) {
            const App = routes[route].component
            return <App />
          }
        } else {
          const routeArgs = exec(currentPath, routes[route].path)
          if (routeArgs) {
            const newRoute = {
              name: route,
              path: routes[route].path,
              args: routeArgs
            }
            if (!equal(newRoute, getState().route)) {
              setState({route: newRoute})
            }
            const Component = routes[route].component
            return <Component {...routeArgs} />
          }
        }
      }
    }}
  </WithState>
