import connect from '@app-elements/connect'
import urlFor from '/util/urlFor'

const Header = connect({
  name: 'Header',
  withActions: {
    increment: ({clicks}) => ({clicks: (clicks || 0) + 1})
  },
  withState: ({clicks}) => ({clicks})
})(({clicks, increment}) => (
  <header class='layout-center'>
    <h1>PWA {clicks}</h1>
    <button onClick={increment}>+</button>
    <a href={urlFor('home')}>Main App</a>&nbsp;
    <a href={urlFor('users')}>Account App</a>&nbsp;
  </header>
))

export default Header
