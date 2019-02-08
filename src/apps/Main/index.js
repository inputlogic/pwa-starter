import { Modals } from '@app-elements/modal'
import Router from '@app-elements/router'

import ExampleModal from '/modals/example-modal'

import Home from './home'

export const routes = {
  home: {
    path: '/',
    component: Home
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
