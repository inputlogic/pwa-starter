import asyncComponent from '/elements/async-component'
import url from '/util/url'

import Users from './users'

export const routes = {
  users: {
    path: url('users'),
    component: Users // asyncComponent(() => import('./users').then(m => m.default))
  },
  user: {
    path: url('user'),
    component: asyncComponent(() => import('./user').then(m => m.default))
  }
}

const LazyDashboard = asyncComponent(() =>
  import('./dashboard.js').then(m => m.default)
)

export default LazyDashboard
