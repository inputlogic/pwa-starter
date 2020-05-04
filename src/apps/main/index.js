import Router, { RouteTo, Link } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'

import { getState, logout } from '/store'

import asyncComponent from '/elements/async-component'
import url from '/util/url'

export const routes = {
  users: {
    path: url('users'),
    component: asyncComponent(() => import('./users').then(m => m.default))
  },
  user: {
    path: url('user'),
    component: asyncComponent(() => import('./user').then(m => m.default))
  }
}

const DashboardTree = (
  <div id='dashboard-layout'>
    <Router routes={routes} />
    <header className='container'>
      <Link name='users'>Users</Link>&nbsp;
      <button onClick={ev => logout()}>Logout</button>
    </header>
  </div>
)

export default function DashboardApp () {
  const { token, currentPath } = getState()
  if (token == null) {
    showNotification({ message: 'Please login to view that page.' })
    return <RouteTo name='login' queries={{ next: currentPath }} />
  }
  return DashboardTree
}
