// import { API_URL } from '/consts'

export default [
  {
    namespace: '',
    url: '',
    routes: {
      home: '/',
      gallery: '/elements-gallery',
      login: '/login',
      signup: '/signup',
      forgotPassword: '/forgot-password',
      resetPassword: '/reset-password/:resetToken/:userId',
      users: '/users',
      user: '/users/:id'
    }
  },
  {
    // Mock/placeholder endpoint urls
    // Replace with commented block below if working with django-api-starter
    namespace: 'api',
    url: '',
    routes: {
      login: 'http://www.mocky.io/v2/5d28e8362c000068003edca8',
      signup: 'http://www.mocky.io/v2/5d28efd02c0000cd2f3edcc9',
      forgotPassword: 'http://www.mocky.io/v2/5d28e8362c000068003edca8',
      resetPassword: 'http://www.mocky.io/v2/5e98de313500004d00c48670',
      users: 'https://jsonplaceholder.typicode.com/users',
      user: 'https://jsonplaceholder.typicode.com/users/:id'
    }
  }
  /*
  {
    // For use with django-api-starter
    // http://github.com/inputlogic/django-api-starter
    namespace: 'api',
    url: API_URL,
    routes: {
      login: '/auth/login',
      signup: '/auth/login',
      forgotPassword: '/auth/forgot-password',
      resetPassword: '/auth/reset-password',
      users: '/users',
      user: '/users/:id'
    }
  }
  */
]
