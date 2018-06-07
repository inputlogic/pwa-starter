import {getState, subscribe, set} from '/store'

subscribe('initial', () => {
  console.log('subscribe', getState())
})

subscribe('other.path', () => {
  console.log('not called')
})

const onClick = ev => {
  ev.preventDefault()
  let state = getState()
  set('initial', state.initial + 1)
}

export default (props) =>
  <div>
    <h1 onClick={onClick}>Home</h1>
  </div>
