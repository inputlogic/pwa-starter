import asyncComponent from '/elements/async-component'

import Users from './users'
import User from './user'

export const routes = {
  users: {
    path: '/users',
    component: Users
  },
  user: {
    path: '/users/:id',
    component: User
  }
}

const LazyAccount = asyncComponent(() =>
  import('./account.js').then(({ default: Account }) => {
    return Account
  })
)

export default LazyAccount
