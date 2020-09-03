import { Avatar } from '@app-elements/avatar'
import { Dropdown } from '@app-elements/dropdown'
import { Link, useScrollToTop } from '@app-elements/router'

import { useStorePath } from '/store/hooks'
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
      <Link name='logout' activeClass='active-link'>Log Out</Link>
    </nav>
  </Dropdown>

export function GlobalHeader () {
  const [authed] = useStorePath('token')
  const [, setModal] = useStorePath('modal')

  useScrollToTop()

  const openLoginModal = (ev) => {
    ev.preventDefault()
    setModal('LoginModal')
  }

  return (
    <header class='global-header'>
      <div className='container'>
        <div className='level no-padding'>
          <h1><Link name={authed ? 'app' : 'home'}>PWA</Link></h1>
          {authed
            ? (
              <div className='level pl-2'>
                <nav className='header-nav'>
                  <Link name='users' activeClass='active-link'>Users</Link>
                  <a href='https://github.com/inputlogic/pwa-starter' data-external-link>GitHub</a>
                </nav>
                <UserActions />
              </div>
            )
            : (
              <div className='level pl-2'>
                <nav className='header-nav'>
                  <Link name='home' activeClass='active-link'>Home</Link>
                  <Link name='login' activeClass='active-link'>Log In</Link>
                  <button onClick={openLoginModal}>Log In Modal</button>
                </nav>
                <Link name='signup' className='btn'>Sign Up</Link>
              </div>
            )}
        </div>
      </div>
    </header>
  )
}
