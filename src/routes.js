import { API_URL } from '/consts'

export default [
  {
    namespace: '',
    url: '',
    routes: {
      home: '/',
      login: '/login',
      signup: '/signup',
      forgotPassword: '/forgot-password',
      users: '/users',
      user: '/users/:id'
    }
  },
  {
    namespace: 'api',
    url: API_URL,
    routes: {
      users: '/users',
      user: '/users/:id'
    }
  }
]
