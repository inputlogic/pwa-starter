import Router, { RouteTo, Link } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'

import { asyncComponent } from '/elements/async-component'
import url from '/util/url'
import { getState, logout } from '/store'

export const routes = {
  app: {
    path: url('app'),
    component: asyncComponent(() => import('./users').then(m => m.Users))
  },
  users: {
    path: url('users'),
    component: asyncComponent(() => import('./users').then(m => m.Users))
  },
  user: {
    path: url('user'),
    component: asyncComponent(() => import('./user').then(m => m.User))
  }
}

export function MainApp () {
  const { token, currentPath } = getState()
  if (token == null) {
    showNotification({ message: 'Please login to view that page.' })
    return <RouteTo name='login' queries={{ next: currentPath }} />
  }
  return (
    <div id='main-layout'>
      <Router routes={routes} />
      <header className='container'>
        <Link name='users'>Users</Link>&nbsp;
        <button onClick={ev => logout()}>Logout</button>
      </header>
    </div>
  )
}
