import Preact from 'preact'

import Router from '/hoc/Router'
import Header from '/elements/Header'
import NotFound from '/pages/NotFound'

export const MainApp = () =>
  <div className='main-app-container' >
    <Header />
    <Router currentPath={window.location.pathname} />
    <NotFound />
  </div>

if (typeof window !== 'undefined') {
  Preact.render(
    <MainApp />,
    document.body, document.body.children[0]
  )
}
