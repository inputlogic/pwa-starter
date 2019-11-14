import { Modals } from '@app-elements/modal'
import Router from '@app-elements/router'

import ExampleModal from '/modals/example-modal'

import url from '/util/url'

import Home from './home'
import Login from './login'
import SignUp from './signup'
import ForgotPassword from './forgot-password'

export const routes = {
  home: {
    path: url('home'),
    component: Home
  },
  login: {
    path: url('login'),
    component: Login
  },
  signup: {
    path: url('signup'),
    component: SignUp
  },
  forgotPassword: {
    path: url('forgotPassword'),
    component: ForgotPassword
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
