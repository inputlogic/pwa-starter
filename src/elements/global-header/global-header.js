import Avatar from '@app-elements/avatar'
import { Link } from '@app-elements/router'
import { useMappedState } from '@app-elements/use-mapped-state'

import './global-header.less'

function GlobalHeader () {
  const clicks = useMappedState(
    this.context.store,
    ({ clicks }) => clicks
  )

  const increment = () => this.context.store.setState({ clicks: clicks + 1 })

  return <header class='global-header'>
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
}

export { GlobalHeader }
