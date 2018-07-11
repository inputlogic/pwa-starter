import Preact from 'preact'

import Header from '/elements/Header'
import NotFound from '/elements/NotFound'

import WithState from '/hoc/WithState'

import Main from '/apps/Main'
import Account from '/apps/Account'

import routes from '/routes'

import {exec} from '/hoc/Router'

class Apps extends WithState {
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

export const MainApp = () =>
  <div className='main-app-container' >
    <Header />

    <Apps routes={routes} mapper={({currentPath}) => ({currentPath})}>
      <Main />
      <Account />
    </Apps>

    <NotFound />
  </div>

if (typeof window !== 'undefined') {
  Preact.render(
    <MainApp />,
    document.body, document.body.children[0]
  )
}
