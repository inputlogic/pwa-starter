import {getState, subscribe, set} from '/store'

subscribe('parent', () => {
  console.log('parent', getState().parent.nested.child)
})

subscribe('parent.nested', () => {
  console.log('parent.nested', getState().parent.nested.child)
})

const unsub = subscribe('parent.nested.child', () => {
  console.log('parent.nested.child', getState().parent.nested.child)
  unsub()
})

const onClick = ev => {
  ev.preventDefault()
  let state = getState()
  set('parent.nested.child', state.parent.nested.child + 1)
}

export default (props) =>
  <div>
    <h1 onClick={onClick}>Home</h1>
  </div>
