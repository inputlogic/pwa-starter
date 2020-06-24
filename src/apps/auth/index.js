import { Router } from '@app-elements/router'

import { url } from '/util/url'

import { Login } from './login'
import { Logout } from './logout'
import { SignUp } from './signup'
import { ForgotPassword } from './forgot-password'
import { ResetPassword } from './reset-password'

export const routes = {
  login: {
    path: url('login'),
    component: Login
  },
  logout: {
    path: url('logout'),
    component: Logout
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

export function AuthApp () {
  return (
    <Router routes={routes} />
  )
}
