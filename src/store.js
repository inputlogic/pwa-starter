import createStore from 'atom'
import devtools from 'atom/devtools'

import pathReducer from '@wasmuth/path-reducer'

import { DEBUG } from '/consts'

const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__ // let it get garbage-collected

export const initialState = {
  clicks: 0,
  // In the browser, we initialize the currentPath prop, which is set
  // by [Router](https://github.com/inputlogic/elements/tree/master/components/router)
  currentPath: typeof window !== 'undefined'
    ? window.location.pathname + window.location.search
    : '/',
  // `pendingRequests` is used by the [WithRequest](https://github.com/inputlogic/elements/tree/master/components/with-request) HoC.
  pendingRequests: 0,
  // Server-side rendering will have already computed some
  // values for global state, and should be initialized on the client.
  // This avoids redoing initial logic that was just computed on the server.
  ...(
    typeof window !== 'undefined'
      ? preloadedState || {}
      : {}
  )
}

// You can either define your reducers here, or add them later with:
// `store.addReducer(reducer)`
const reducers = [
  pathReducer
]

const store = typeof window !== 'undefined' && DEBUG
  ? devtools(createStore(reducers, initialState))
  : createStore(reducers, initialState)

// Tell react-snap how to save Redux state
window.snapSaveState = () => ({
  __PRELOADED_STATE__: store.getState()
})

export default store

export const getState = store.getState
export const setState = store.setState

export function Provider (props) {
  this.getChildContext = () => ({ store: props.store })
}
Provider.prototype.render = props => props.children[0]
