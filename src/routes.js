// import { API_URL } from '/consts'

export const routes = [
  {
    namespace: '',
    url: '',
    routes: {
      home: '/',
      login: '/login',
      logout: '/logout',
      signup: '/signup',
      forgotPassword: '/forgot-password',
      resetPassword: '/reset-password/:resetToken/:userId',
      app: '/users',
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
      login: 'https://www.mocky.io/v2/5d28e8362c000068003edca8',
      signup: 'https://www.mocky.io/v2/5d28efd02c0000cd2f3edcc9',
      // If you want to test error states, use the below mock endpoint.
      // signup: 'https://run.mocky.io/v3/ecf1c57d-6ab1-4b50-b17b-7646ade58435',
      forgotPassword: 'https://www.mocky.io/v2/5d28e8362c000068003edca8',
      resetPassword: 'https://www.mocky.io/v2/5e98de313500004d00c48670',
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
      signup: '/auth/signup',
      forgotPassword: '/auth/forgot-password',
      resetPassword: '/auth/reset-password',
      users: '/users',
      user: '/users/:id'
    }
  }
  */
]
