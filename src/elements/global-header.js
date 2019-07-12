import connect from '@app-elements/connect'
import { Link } from '@app-elements/router'

const GlobalHeader = connect({
  name: 'GlobalHeader',
  withActions: {
    increment: ({ clicks }) => ({ clicks: (clicks || 0) + 1 })
  },
  withState: ({ clicks }) => ({ clicks })
})(({ clicks, increment }) => (
  <header class='layout-center'>
    <h1>PWA {clicks}</h1>
    <button onClick={increment}>+</button>
    <Link name='home' activeClass='active-link'>Main App</Link>&nbsp;
    <Link name='users'>Dashboard App</Link>&nbsp;
  </header>
))

export default GlobalHeader
