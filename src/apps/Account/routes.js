import Users from './Users'
import User from './User'
import Login from './Login'

export default {
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
