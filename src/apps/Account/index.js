import Router from '/hoc/Router'
import urlFor from '/util/urlFor'

import Users from './Users'
import User from './User'
import Login from './Login'

export const routes = {
  users: {
    path: '/users',
    Page: Users
  },
  user: {
    path: '/users/:id',
    Page: User
  },
  login: {
    path: '/login',
    Page: Login
  }
}

const AccountHeader = () =>
  <header className='alt'>
    <a href={urlFor('users')}>Users</a>&nbsp;
    <a href={urlFor('login')}>Login</a>
  </header>

export default () =>
  <div id='account-layout'>
    <AccountHeader />
    <Router routes={routes} />
  </div>
