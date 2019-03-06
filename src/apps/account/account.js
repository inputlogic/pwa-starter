import Router, { routeTo } from '@app-elements/router'
import withState from '@app-elements/with-state'

import urlFor from '/util/urlFor'

import { routes } from './index'

const AccountHeader = () =>
  <header className='alt'>
    <a href={urlFor('users')}>Users</a>&nbsp;
    <a href={urlFor('login')}>Login</a>
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
    const isAuthed = token != null
    return { isAuthed }
  }
})(AccountApp)
