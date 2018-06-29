import {getState, setState} from '/store'

export const clickState = state => ev => {
  ev.preventDefault()
  setState(
    typeof state === 'function'
      ? state(getState())
      : state
  )
}

export default clickState
