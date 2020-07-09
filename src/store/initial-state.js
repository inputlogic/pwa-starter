// Load state set by react-snap during prerendering
const preloadedState = window.__PRELOADED_STATE__ || {}
delete window.__PRELOADED_STATE__ // let it get garbage-collected

// These are the values initialized in our store, before
// the app mounts and renders.
export const initialState = {
  clicks: 0,
  token: window.localStorage.getItem('token'),

  // Pre-rendering will have already computed some values for global state,
  // and should be initialized on the client.
  ...preloadedState
}
