import { Fragment } from 'react'
import Router from '@app-elements/router'

import { Home } from './home'
import { MarketingFooter } from './footer'

import { url } from '/util/url'

export const routes = {
  home: {
    path: url('home'),
    component: Home
  }
}

export function MarketingApp () {
  return (
    <Fragment>
      <Router routes={routes} />
      <MarketingFooter />
    </Fragment>
  )
}
