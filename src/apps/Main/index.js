import Router from '/hoc/Router'
import {Modals} from '/elements/Modal'
import ExampleModal from '/modals/ExampleModal'

import Home from './Home'
import Videos from './Videos'

export const routes = {
  home: {
    path: '/',
    Page: Home
  },
  videos: {
    path: '/videos',
    Page: Videos
  }
}

export default () =>
  <div>
    <Router routes={routes} />
    <Modals>
      <ExampleModal />
    </Modals>
  </div>
