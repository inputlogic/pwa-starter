import Preact from 'preact'

import Header from '/elements/Header'
import Notification from '/elements/Notification'
import NotFound from '/elements/NotFound'

import Apps from '/hoc/Apps'
import Helmet from '/hoc/Helmet'

import Main from '/apps/Main'
import Account from '/apps/Account'

import routes from '/routes'

import '/styles/variables.less'
import '/styles/base.less'

export const MainApp = () =>
  <div className='main-app-container' >
    <Helmet
      title='Welcome'
      titleTemplate='PWA Starter | %s'
      defaultTitle='Welcome'
    />

    <Header />
    <Notification />

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
