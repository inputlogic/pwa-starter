import {getState} from '/store'

const onClick = ev => {
  ev.preventDefault()
  let state = getState()
  console.log('state', state)
}

export default (props) =>
  <div>
    <h1 onClick={onClick}>Home</h1>
  </div>
