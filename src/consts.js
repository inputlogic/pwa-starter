import { environment } from '/util/environment'

export const DEBUG = {
  development: true,
  staging: true,
  production: false
}[environment]

export const API_URL = {
  development: 'http://127.0.0.1:8000',
  staging: 'https://my-app-staging.herokuapp.com',
  production: 'https://my-app-api.herokuapp.com'
}[environment]
