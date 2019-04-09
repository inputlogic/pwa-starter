import Router, { routeTo } from '@app-elements/router'
import withState from '@app-elements/with-state'

import Link from '/elements/link'

import { routes } from './index'

const AccountHeader = () =>
  <header className='alt'>
    <Link name='users'>Users</Link>&nbsp;
    <Link name='login'>Login</Link>
  </header>

const AccountApp = ({ isAuthed }) =>
  !isAuthed
    ? routeTo('login')
    : (
      <div id='account-layout'>
        <AccountHeader />
        <Router routes={routes} />
      </div>
    )

export default withState({
  mapper: ({ token }) => {
    // @TODO: Check if token is valid
    const isAuthed = token == null
    return { isAuthed }
  }
})(AccountApp)
