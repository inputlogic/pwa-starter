import Router from '@app-elements/router'

import url from '/util/url'

import Login from './login'
import SignUp from './signup'
import ForgotPassword from './forgot-password'
import ResetPassword from './reset-password'

export const routes = {
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
  },
  resetPassword: {
    path: url('resetPassword'),
    component: ResetPassword
  }
}

const AuthTree = (
  <Router routes={routes} />
)

export default function AuthApp () {
  return AuthTree
}