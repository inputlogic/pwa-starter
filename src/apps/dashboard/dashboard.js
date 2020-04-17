import Router, { RouteTo, Link } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'

import { getState, logout } from '/store'
import { routes } from './index'

const DashboardFooter = () =>
  <header className='container'>
    <Link name='users'>Users</Link>&nbsp;
    <button onClick={ev => logout()}>Logout</button>
  </header>

export default function DashboardApp () {
  const { token, currentPath } = getState()
  if (token == null) {
    showNotification({ message: 'Please login to view that page.' })
    return <RouteTo name='login' queries={{ next: currentPath }} />
  }
  return (
    <div id='dashboard-layout'>
      <Router routes={routes} />
      <DashboardFooter />
    </div>
  )
}
