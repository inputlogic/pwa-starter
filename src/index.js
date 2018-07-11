import Preact from 'preact'

import Header from '/elements/Header'
import NotFound from '/elements/NotFound'

import Apps from '/hoc/Apps'

import Main from '/apps/Main'
import Account from '/apps/Account'

import routes from '/routes'

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
