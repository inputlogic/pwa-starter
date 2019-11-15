import Avatar from '@app-elements/avatar'
import connect from '@app-elements/connect'
import { Link } from '@app-elements/router'

import './global-header.less'

export const GlobalHeader = connect({
  name: 'GlobalHeader',
  withActions: {
    increment: ({ clicks }) => ({ clicks: (clicks || 0) + 1 })
  },
  withState: ({ clicks }) => ({ clicks })
})(({ clicks, increment }) => (
  <header class='global-header'>

    <div className='container'>

      <div className='logo'>
        <h1>PWA {clicks >= 1 && <span className='clicks'>{clicks}</span>}</h1>
        <ul className='nav'>
          <li><Link name='home' activeClass='active-link'>Main App</Link></li>
          <li><Link name='users' activeClass='active-link'>Dashboard App</Link></li>
          <li><button onClick={increment}>+</button></li>
        </ul>

      </div>

      <div className='user-actions'>

        <Avatar
          src='/images/_temp/avatar.png'
          fullName='John Smith'

        />

      </div>
    </div>
  </header>
))
