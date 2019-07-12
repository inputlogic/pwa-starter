import qs from '@app-elements/router/qs'

import routes from '/routes'

const hasProp = Object.prototype.hasOwnProperty

// Transform our `Component => Object` pairs to a single Object.
// The `urlFor` function below will reference it to return a URL string
// for a given name.

const getAllRoutes = routes =>
  Object
    .keys(routes || {})
    .reduce((acc, r) =>
      hasProp.call(routes[r], 'routes')
        ? { ...acc, ...getAllRoutes(routes[r].routes) }
        : { ...acc, [r]: routes[r] },
    {})

const allRoutes = getAllRoutes(routes)

// Get the path string for the route with name `name`
// Best understood with an example:

// ```
// const routes = {
//   myRoute: '/some/:fancy/:route'
// }
// urlFor('myRoute', {
//   args: {fancy: 12, route: 'r2d2'},
//   queries: {search: 'hi'}
// })
// > '/some/12/r2d2?search=hi'
// ```

export const urlFor = (name, { args = {}, queries = {} } = {}) => {
  const rule = allRoutes[name]
  if (!rule) {
    console.warn('No route found for name: ' + name)
    return
  }
  const replaced = Object
    .keys(args)
    .reduce((acc, k) => acc.replace(`:${k}`, args[k]), rule.path)
  const hasQueries = Object.keys(queries).length > 0
  return `${replaced}${!hasQueries ? '' : '?' + qs.stringify(queries)}`
}

export default urlFor
