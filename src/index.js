import Preact from 'preact'

import Router from '/hoc/Router'
import NotFound from '/pages/NotFound'

export const MainApp = ({currentPath}) =>
  <div className='main-app-container' >
    <Router currentPath={currentPath} />
    <NotFound />
  </div>

if (typeof window !== 'undefined') {
  Preact.render(<MainApp currentPath={window.location.pathname} />, document.body, document.body.children[0])
}
