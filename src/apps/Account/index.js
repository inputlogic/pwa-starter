import Router from '@app-elements/router'

import urlFor from '/util/urlFor'

import Users from './users'
import User from './user'
import Login from './login'

export const routes = {
  users: {
    path: '/users',
    component: Users
  },
  user: {
    path: '/users/:id',
    component: User
  },
  login: {
    path: '/login',
    component: Login
  }
}

const AccountHeader = () =>
  <header className='alt'>
    <a href={urlFor('users')}>Users</a>&nbsp;
    <a href={urlFor('login')}>Login</a>
  </header>

const AccountApp = () =>
  <div id='account-layout'>
    <AccountHeader />
    <Router routes={routes} />
  </div>

export default AccountApp
