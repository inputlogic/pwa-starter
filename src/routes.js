import Home from '/pages/Home'
import Users from '/pages/Users'
import User from '/pages/User'
import Login from '/pages/Login'

export default {
  home: {
    path: '/',
    Page: Home
  },
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
