import {DEBUG} from '/consts'

if (typeof window !== 'undefined') {
  console.log(window.__initial_store__)
}

const state = {
  currentPath: window.location.pathname + window.location.search,
  clicks: 1,
  wins: 1,
  parent: {
    nested: {
      child: 1
    }
  }
}
const components = []

export const subscribe = component => {
  components.push(component)
  return getState()
}

export const unsubscribe = component => {
  const idx = components.findIndex(c => c === component)
  idx > -1 && components.splice(idx, 1)
}

export const getState = () => Object.freeze({...state})

export const setState = updatedState => {
  Object.assign(state, updatedState)
  DEBUG && console.log('setState', updatedState, state)
  components.forEach(c => c.setState(state))
}

export const clickState = state => ev => {
  ev.preventDefault()
  setState(
    typeof state === 'function'
      ? state(getState(), ev)
      : state
  )
}
