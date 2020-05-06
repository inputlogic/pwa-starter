import { Fragment } from 'react'
import Avatar from '@app-elements/avatar'
import Dropdown from '@app-elements/dropdown'
import { Link } from '@app-elements/router'
import { useMappedState } from '@app-elements/use-mapped-state'

import './global-header.less'

const UserActions = () =>
  <Dropdown
    uid='user-actions'
    Trigger={({ onClick, className }) => (
      <div className={`user-actions ${className}`} onClick={onClick}>
        <Avatar
          src='/images/_temp/avatar.png'
          fullName='John Smith'
        />
      </div>
    )}
  >
    <nav className='user-actions-nav flex column'>
      <Link name='home' activeClass='active-link'>Home</Link>
      <Link name='login' activeClass='active-link'>Log In</Link>
    </nav>
  </Dropdown>

export function GlobalHeader () {
  const authed = useMappedState(this.context.store, ({ token }) => token != null)

  return (
    <header class='global-header'>
      <div className='container'>
        <div className='level'>
          <h1><Link name={authed ? 'app' : 'home'}>PWA</Link></h1>
          {authed
            ? (
              <Fragment>
                <nav>
                  <Link name='users' activeClass='active-link'>Users</Link>
                </nav>
                <UserActions />
              </Fragment>
            )
            : (
              <Fragment>
                <nav>
                  <Link name='home' activeClass='active-link'>Home</Link>
                  <Link name='login' activeClass='active-link'>Log In</Link>
                </nav>
                <Link name='signup' className='btn'>Sign Up</Link>}
              </Fragment>
            )}
        </div>
      </div>
    </header>
  )
}
