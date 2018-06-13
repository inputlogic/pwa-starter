import Preact from 'preact'

// import Router from '/hoc/Router'
// import NotFound from '/pages/NotFound'

import Header from '/elements/Header'
import Actions from '/elements/Actions'
import Canvas from '/elements/Canvas'

import {subscribe, getState} from '/store'

export const MainApp = () =>
  <div className='main-app-container' >
    <Header />
    <Canvas />
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
