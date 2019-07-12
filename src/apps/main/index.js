import { Modals } from '@app-elements/modal'
import Router from '@app-elements/router'

import ExampleModal from '/modals/example-modal'

import Home from './home'
import Login from './login'
import SignUp from './signup'
import ForgotPassword from './forgot-password'

export const routes = {
  home: {
    path: '/',
    component: Home
  },
  login: {
    path: '/login',
    component: Login
  },
  signup: {
    path: '/signup',
    component: SignUp
  },
  forgotPassword: {
    path: '/forgot-password',
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
