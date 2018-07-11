import Preact from 'preact'
import WithState from '/hoc/WithState'
import {exec} from '/hoc/Router'

export default class Apps extends WithState {
  render ({children, routes}, {_mappedState}) {
    const {currentPath} = _mappedState
    let currentApp
    for (let app in routes) {
      for (let route in routes[app]) {
        const routeArgs = exec(currentPath, routes[app][route].path)
        if (routeArgs) {
          currentApp = app
        }
      }
    }
    const child = children.filter(({nodeName}) => nodeName.name === currentApp)[0]
    const App = Preact.cloneElement(child, {routes: routes[currentApp]})
    return App
  }
}
