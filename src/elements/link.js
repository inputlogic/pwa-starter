import qs from '@app-elements/router/qs'

import routes from '/routes'

const getAllRoutes = routes =>
  Object
    .keys(routes || {})
    .reduce((acc, r) =>
      routes[r].hasOwnProperty('routes')
        ? { ...acc, ...getAllRoutes(routes[r].routes) }
        : { ...acc, [r]: routes[r] },
    {})

export const Link = ({ children, name, args = {}, queries = {}, ...props }) => {
  const rule = getAllRoutes(routes)[name]
  if (!rule) {
    console.warn('No route found for name: ' + name)
    return
  }
  const replaced = Object
    .keys(args)
    .reduce((acc, k) => acc.replace(`:${k}`, args[k]), rule.path)
  const hasQueries = Object.keys(queries).length > 0
  const href = `${replaced}${!hasQueries ? '' : '?' + qs.stringify(queries)}`

  return (
    <a href={href} {...props}>{children}</a>
  )
}
