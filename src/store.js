import {DEBUG} from '/consts'

const state = {
  currentPath: typeof window !== 'undefined'
    ? window.location.pathname + window.location.search
    : '/',
  pendingRequests: 0,
  ...(typeof window !== 'undefined'
      ? JSON.parse(window.__initial_store__ || '')
      : {})
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
