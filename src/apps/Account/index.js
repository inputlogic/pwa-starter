import Router from '/hoc/Router'
import urlFor from '/util/urlFor'

const AccountHeader = () =>
  <header className='alt'>
    <a href={urlFor('users')}>Users</a>&nbsp;
    <a href={urlFor('login')}>Login</a>
  </header>

export default ({routes}) =>
  <div id='account-layout'>
    <AccountHeader />
    <Router routes={routes} />
  </div>
