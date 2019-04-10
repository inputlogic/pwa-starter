import Preact from 'preact'

import qs from '@app-elements/router/qs'

let allRoutes

const getAllRoutes = routes =>
  Object
    .keys(routes || {})
    .reduce((acc, r) =>
      routes[r].hasOwnProperty('routes')
        ? { ...acc, ...getAllRoutes(routes[r].routes) }
        : { ...acc, [r]: routes[r] },
    {})

export class Link extends Preact.Component {
  render () {
    const { routes } = this.context
    const { name, args = {}, queries = {}, children, ...props } = this.props

    if (allRoutes == null) {
      allRoutes = getAllRoutes(routes)
    }

    const rule = allRoutes[name]
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
}

export default Link
