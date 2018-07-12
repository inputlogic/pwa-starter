import W from 'wasmuth'
import Preact from 'preact'
import WithState from '/hoc/WithState'
import {exec} from '/hoc/Router'

export default class Apps extends WithState {
  render ({children, routes}, {_mappedState}) {
    const {currentPath} = _mappedState
    const routeMatches = r => exec(currentPath, r.path)
    const appName = W.pipe(
      W.map((name, routes) => Object.values(routes)),
      W.toPairs,
      W.find(([name, routes]) => W.find(routeMatches, routes)),
      ([name, _]) => name
    )(routes)
    const App = W.pipe(
      W.find(W.pathEq('nodeName.name', appName)),
      child => Preact.cloneElement(child, {routes: routes[appName]})
    )(children)
    return App
  }
}
