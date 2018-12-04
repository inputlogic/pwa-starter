import createStore from 'atom'
import devtools from 'atom/devtools'

import pathReducer from '@wasmuth/path-reducer'

import {DEBUG} from '/consts'

export const initialState = {
  clicks: 0,
  // In the browser, we initialize the currentPath prop, which is used
  // by our [Router](/hoc/Router.html)
  currentPath: typeof window !== 'undefined'
    ? window.location.pathname + window.location.search
    : '/',
  // `pendingRequests` is used by the [WithRequest](/hoc/WithRequest.html) HoC.
  pendingRequests: 0,
  // Server-side rendering will have already computed some
  // values for global state, and should be initialized on the client.
  // This avoids redoing initial logic that was just computed on the server.
  ...(typeof window !== 'undefined'
    ? JSON.parse(window.__initial_store__ || '')
    : {})
}

// You can either define your reducers here, or add them later with:
// `store.addReducer(reducer)`
const reducers = [
  pathReducer
]

const store = typeof window !== 'undefined' && DEBUG
  ? devtools(createStore(reducers, initialState))
  : createStore(reducers, initialState)

export default store

export const getState = store.getState
export const setState = store.setState

export function Provider (props) {
  this.getChildContext = () => ({store: props.store})
}
Provider.prototype.render = props => props.children[0]
