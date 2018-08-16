import Apps from '/hoc/Apps'
import Router from '/hoc/Router'
import urlFor from '/util/urlFor'

import Login from './Login'

import {routes as userRoutes} from './UserApp'

export const routes = {
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
    <Apps routes={userRoutes} />
  </div>
