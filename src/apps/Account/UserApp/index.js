import Router from '/hoc/Router'

import Users from '../Users'
import User from '../User'

export const routes = {
  users: {
    path: '/users',
    Page: Users
  },
  user: {
    path: '/users/:id',
    Page: User
  }
}

export default () =>
  <div id='user-app'>
    <h1>User App</h1>
    <Router routes={routes} />
  </div>
