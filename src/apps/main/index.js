import { Modals } from '@app-elements/modal'
import Router from '@app-elements/router'

import ExampleModal from '/modals/example-modal'

import url from '/util/url'

import Home from './home'

export const routes = {
  home: {
    path: url('home'),
    component: Home
  }
}

export default function MainApp () {
  return (
    <div>
      <Router routes={routes} />
      <Modals>
        <ExampleModal />
      </Modals>
    </div>
  )
}
