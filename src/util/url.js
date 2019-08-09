import qs from '@app-elements/router/qs'

import allRoutes from '/routes'

// Get the path string for the route with name `name`
// Best understood with an example:

// ```
// const routes = {
//   myRoute: '/some/:fancy/:route'
// }
// url('myRoute', {
//   args: {fancy: 12, route: 'r2d2'},
//   queries: {search: 'hi'}
// })
// > '/some/12/r2d2?search=hi'
// ```

export const url = (name, { args = {}, queries = {} } = {}) => {
  let ns = ''
  if (name.indexOf('.') !== -1) {
    [ns, name] = name.split('.')
  }

  const scheme = allRoutes.find(({ namespace }) => namespace === ns)
  if (!scheme) console.warn('No route scheme with namespace', ns)

  const rule = scheme.routes[name]
  if (!rule) console.warn('No route found for name', name)

  const replaced = Object
    .keys(args)
    .reduce((acc, k) => acc.replace(`:${k}`, args[k]), rule)
  const hasQueries = Object.keys(queries).length > 0

  return `${scheme.url}${replaced}${!hasQueries ? '' : '?' + qs.stringify(queries)}`
}

export default url
