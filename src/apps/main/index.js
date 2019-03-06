import { Modals } from '@app-elements/modal'
import Router from '@app-elements/router'

import ExampleModal from '/modals/example-modal'

import Home from './home'
import Login from './login'

export const routes = {
  home: {
    path: '/',
    component: Home
  },
  login: {
    path: '/login',
    component: Login
  }
}

const MainApp = () =>
  <div>
    <Router routes={routes} />
    <Modals>
      <ExampleModal />
    </Modals>
  </div>

export default MainApp
