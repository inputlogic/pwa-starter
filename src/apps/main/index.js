import { Modals } from '@app-elements/modal'
import Router, { RouteTo } from '@app-elements/router'

import ExampleModal from '/modals/example-modal'

import url from '/util/url'

export const routes = {
  home: {
    path: url('home'),
    component: <RouteTo name='gallery' />
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
