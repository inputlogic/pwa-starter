// This is our global store. Which is basically just an single, global JavaScript object,
// which is immutable. Meaning you cannot mutate the object directly, but instead must call
// `store.setState` or dispatch actions similar to redux.

import createStore from 'atom'
import devtools from 'atom/devtools'

import { DEBUG } from '/consts'
import { initialState } from './initial-state'

// You can either define your reducers here, or add them later with:
// `store.addReducer(reducer)`
const reducers = []

// If DEBUG is true, we will enable Redux devtools
export const store = DEBUG && !window.isJest
  ? devtools(createStore(reducers, initialState))
  : createStore(reducers, initialState)

// Tell react-snap how to save Redux state
window.snapSaveState = () => ({
  __PRELOADED_STATE__: W.without(['currentPath', 'currentRoute', 'token'], store.getState())
})

// Expose some store methods directly for convenience
export const getState = store.getState
export const setState = store.setState
export const dispatch = store.dispatch

export function logout (stateToKeep = {}) {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('userId')
  window.location.pathname = '/'
  window.requestAnimationFrame(() => {
    setState({
      ...initialState,
      ...stateToKeep,
      token: null
    })
  })
}
