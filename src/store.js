import createStore from 'atom'
import devtools from 'atom/devtools'
import without from '@wasmuth/without'

import pathReducer, { actions } from '@wasmuth/path-reducer'

import { DEBUG } from '/consts'

// Tell react-snap how to save Redux state
window.snapSaveState = () => ({
  __PRELOADED_STATE__: without(['currentPath', 'currentRoute', 'token'], store.getState())
})

// Load state set by react-snap during prerendering
const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__ // let it get garbage-collected

// Define the global state on page load.
export const initialState = {
  token: window.localStorage.getItem('token'),
  // Pre-rendering will have already computed some values for global state,
  // and should be initialized on the client.
  ...(
    typeof window !== 'undefined'
      ? preloadedState || {}
      : {}
  )
}

function clearStateReducer (action, state) {
  return action && action.type === 'CLEAR_STATE'
    ? Object.assign({}, action.payload || initialState)
    : state
}

// You can either define your reducers here, or add them later with:
// `store.addReducer(reducer)`
const reducers = [
  pathReducer,
  clearStateReducer
]

// If DEBUG is true, we will enable Redux devtools
export const store = typeof window !== 'undefined' && DEBUG
  ? devtools(createStore(reducers, initialState))
  : createStore(reducers, initialState)

export default store

export const clearState = (newState = {}) => {
  store.dispatch({ type: 'CLEAR_STATE', payload: newState })
}

export const getState = store.getState
export const setState = store.setState
export const dispatch = store.dispatch

export const batch = actions.batch
export const set = actions.set
export const update = actions.update

// This is a simple Provider used in the RootApp to provide the
// store instance on the React Context, so any child Component can
// access it.
export function Provider (props) {
  this.getChildContext = () => ({ store: props.store, routes: props.routes })
}
Provider.prototype.render = props => props.children[0]
