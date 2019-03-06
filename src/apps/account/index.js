import asyncComponent from '/elements/async-component'

export const routes = {
  users: {
    path: '/users',
    component: asyncComponent(() => import('./users').then(m => m.default))
  },
  user: {
    path: '/users/:id',
    component: asyncComponent(() => import('./user').then(m => m.default))
  }
}

const LazyAccount = asyncComponent(() =>
  import('./account.js').then(m => m.default)
)

export default LazyAccount
