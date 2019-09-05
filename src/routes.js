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
  },
  {
    namespace: 'mock',
    url: 'http://www.mocky.io/v2/',
    routes: {
      login: '5d28e8362c000068003edca8',
      signup: '5d28efd02c0000cd2f3edcc9',
      forgotPassword: '5d28e8362c000068003edca8'
    }
  },
  {
    namespace: 'placeholder',
    url: 'https://jsonplaceholder.typicode.com',
    routes: {
      users: '/users',
      user: '/users/:id'
    }
  }
]
