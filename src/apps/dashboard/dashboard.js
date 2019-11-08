import Router, { RouteTo, Link } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'

import { getState, logout } from '/store'
import { routes } from './index'

const DashboardHeader = () =>
  <header className='container'>
    <Link name='users'>Users</Link>&nbsp;
    <button onClick={ev => logout()}>Logout</button>
  </header>

export default function DashboardApp () {
  const { token } = getState()
  if (token == null) {
    showNotification({ message: 'Please login to view that page.' })
    return <RouteTo name='login' />
  }
  return (
    <div id='dashboard-layout'>
      <DashboardHeader />
      <Router routes={routes} />
    </div>
  )
}
