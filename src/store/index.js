// This is our global store. Which is basically just an single, global JavaScript object,
// which is immutable. Meaning you cannot mutate the object directly, but instead must call
// `store.setState` or dispatch actions similar to redux.

import createStore from 'atom'
import devtools from 'atom/devtools'
import { requestsReducer, actions as reqActions } from '@app-elements/use-request'

import { DEBUG } from '/consts'
import { initialState } from './initial-state'

// You can either define your reducers here, or add them later with:
// `store.addReducer(reducer)`
const reducers = [
  requestsReducer
]

// If DEBUG is true, we will enable Redux devtools
export const store = DEBUG && !window.isJest
  ? devtools(createStore(reducers, initialState))
  : createStore(reducers, initialState)

// Expose some store methods directly for convenience
export const getState = store.getState
export const setState = store.setState
export const dispatch = store.dispatch

export const appendRequest = reqActions.appendRequest
export const clearRequest = reqActions.clearRequest
export const clearRequests = reqActions.clearRequests
export const patchListRequest = reqActions.patchListRequest

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

// Tell react-snap how to save Redux state
// We omit certain keys as we don't want to persist them from the pre-rendering
// build step.
// We omit currentPath and currentRoute as they will reflect the
// last URL visited by react-snap. When the user loads the website, if the URL
// doesn't match what currentPath and currentRoute are set to, then there will
// be a discrepancy until SyncRouterState updates the values.
// We also omit token, to avoid it potentially being set to a bad value, which
// could cause our app to perform an authenticated request, responding with
// a 401.
window.snapSaveState = () => ({
  __PRELOADED_STATE__: W.without(['currentPath', 'currentRoute', 'token'], store.getState())
})
