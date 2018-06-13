import Preact from 'preact'

import Router from '/hoc/Router'
import NotFound from '/pages/NotFound'

import Actions from '/elements/Actions'
import Canvas from '/elements/Canvas'

import {subscribe, getState} from '/store'

const Header = () =>
  <header class='layout-center'>
    <h1>Daily</h1>
  </header>

export const MainApp = ({currentPath}) =>
  <div className='main-app-container' >
    <Header />
    <Canvas />
    <Router currentPath={currentPath} />
    <NotFound />
    <Actions />
  </div>

if (typeof window !== 'undefined') {
  Preact.render(<MainApp currentPath={window.location.pathname} />, document.body, document.body.children[0])
  if (window.location.hostname.indexOf('local') !== -1) {
    subscribe(() => {
      console.log('state', getState())
    })
  }
}
