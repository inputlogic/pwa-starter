import Router, { routeTo } from '@app-elements/router'

import { getState } from '/store'
import Link from '/elements/link'
import { routes } from './index'

const AccountHeader = () =>
  <header className='alt'>
    <Link name='users'>Users</Link>&nbsp;
    <Link name='login'>Login</Link>
  </header>

export default function AccountApp () {
  const { token } = getState()
  if (token == null) {
    routeTo('login')
    return null
  }

  return (
    <div id='account-layout'>
      <AccountHeader />
      <Router routes={routes} />
    </div>
  )
}
