import WithState from '/hoc/WithState'
import urlFor from '/util/urlFor'
import {clickState} from '/store'

export default () =>
  <WithState mapper={({clicks}) => ({clicks})}>
    {({clicks}) =>
      <header class='layout-center'>
        <h1>PWA {clicks}</h1>
        <button onClick={clickState({clicks: clicks + 1})}>+</button>
        <a href={urlFor('home')}>Main App</a>&nbsp;
        <a href={urlFor('users')}>Account App</a>&nbsp;
      </header>
    }
  </WithState>
