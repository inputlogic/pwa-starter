import Router, { RouteTo, Link } from '@app-elements/router'

// import { getState } from '/store'
import { routes } from './index'

const DashboardHeader = () =>
  <header className='alt'>
    <Link name='users'>Users</Link>&nbsp;
    <Link name='login'>Login</Link>
  </header>

export default function DashboardApp () {
  // const { token } = getState()
  const token = 1
  return token == null
    ? <RouteTo name='login' />
    : (
      <div id='dashboard-layout'>
        <DashboardHeader />
        <Router routes={routes} />
      </div>
    )
}
