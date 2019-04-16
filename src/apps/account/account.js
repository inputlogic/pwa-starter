import Router, { RouteTo, Link } from '@app-elements/router'

import { getState } from '/store'
import { routes } from './index'

const AccountHeader = () =>
  <header className='alt'>
    <Link name='users'>Users</Link>&nbsp;
    <Link name='login'>Login</Link>
  </header>

export default function AccountApp () {
  const { token } = getState()
  return token == null
    ? <RouteTo name='login' />
    : (
      <div id='account-layout'>
        <AccountHeader />
        <Router routes={routes} />
      </div>
    )
}
