import asyncComponent from '/elements/async-component'

export const routes = {
  users: {
    path: '/users',
    component: asyncComponent(() =>
      import('./users.js').then(module => module.default)
    )
  },
  user: {
    path: '/users/:id',
    component: asyncComponent(() =>
      import('./user.js').then(module => module.default)
    )
  }
}

const LazyAccount = asyncComponent(() =>
  import('./account.js').then(module => module.default)
)

export default LazyAccount
