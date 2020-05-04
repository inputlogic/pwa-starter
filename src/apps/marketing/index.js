import Router from '@app-elements/router'
import url from '/util/url'
import { Home } from './home'

export const routes = {
  home: {
    path: url('home'),
    component: Home
  }
}

const MarketingTree = (
  <Router routes={routes} />
)

export default function MarketingApp () {
  return MarketingTree
}
