import Preact from 'preact'

import Router from '/hoc/Router'
import Header from '/elements/Header'
import NotFound from '/pages/NotFound'

import routes from '/routes'
import {setState} from '/store'

export const MainApp = () =>
  <div className='main-app-container' >
    <Header />
    <Router currentPath={window.location.pathname} routes={routes} />
    <NotFound />
  </div>

if (typeof window !== 'undefined') {
  document.addEventListener('click', ev => {
    if (ev.target.nodeName === 'A') {
      ev.preventDefault()
      ev.stopImmediatePropagation()
      window.scrollTo(0, 0)
      const url = ev.target.getAttribute('href')
      window.history['pushState'](null, null, url)
      setState({pushState: url})
    }
  })

  Preact.render(
    <MainApp />,
    document.body, document.body.children[0]
  )
}
