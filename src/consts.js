export const DEBUG = typeof window !== 'undefined'
  ? window.location.hostname.indexOf('local') > -1
  : process.env.NODE_ENV
