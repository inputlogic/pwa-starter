import Router from '/hoc/Router'
import {Modals} from '/elements/Modal'
import ExampleModal from '/modals/ExampleModal'
import routes from './routes'

export default () =>
  <div>
    <Router routes={routes} />
    <Modals>
      <ExampleModal />
    </Modals>
  </div>
