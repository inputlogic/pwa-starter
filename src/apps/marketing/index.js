import Router from '@app-elements/router'
import url from '/util/url'
import { Home } from './home'

export const routes = {
  home: {
    path: url('home'),
    component: Home
  }
}

export function MarketingApp () {
  return (
    <Router routes={routes} />
  )
}
