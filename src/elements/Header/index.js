import WithState from '/hoc/WithState'
import {clickState} from '/store'

export default () =>
  <WithState mapper={({clicks}) => ({clicks})}>
    {({clicks}) =>
      <header class='layout-center'>
        <h1>Daily {clicks}</h1>
        <button onClick={clickState({clicks: clicks + 1})}>+</button>
        <button onClick={clickState(state => ({wins: state.wins + 1}))}>wins</button>
      </header>
    }
  </WithState>
