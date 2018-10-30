import {connect} from 'unistore/preact'
import urlFor from '/util/urlFor'

const actions = store => ({
  increment: ({clicks}) => ({clicks: clicks + 1})
})

const Header = connect('clicks', actions)(({clicks, increment}) => (
  <header class='layout-center'>
    <h1>PWA {clicks}</h1>
    <button onClick={increment}>+</button>
    <a href={urlFor('home')}>Main App</a>&nbsp;
    <a href={urlFor('users')}>Account App</a>&nbsp;
  </header>
))

export default Header
