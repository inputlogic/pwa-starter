import asyncComponent from '/elements/async-component'
import Users from './users'

export const routes = {
  users: {
    path: '/users',
    component: Users // asyncComponent(() => import('./users').then(m => m.default))
  },
  user: {
    path: '/users/:id',
    component: asyncComponent(() => import('./user').then(m => m.default))
  }
}

const LazyDashboard = asyncComponent(() =>
  import('./dashboard.js').then(m => m.default)
)

export default LazyDashboard
