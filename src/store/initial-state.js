// Load state set by react-snap during prerendering
const preloadedState = window.__PRELOADED_STATE__ || {}
delete window.__PRELOADED_STATE__ // let it get garbage-collected

// These are the values initialized in our store, before
// the app mounts and renders.
export const initialState = {
  clicks: 0,
  token: window.localStorage.getItem('token'),

  // We could wait for SyncRouterState to set the currentPath,
  // but it's nice to have it set before we mount our app.
  // See: https://github.com/inputlogic/elements/blob/master/components/router/router.js#L186
  currentPath: window.location.pathname + window.location.search,

  // Pre-rendering will have already computed some values for global state,
  // and should be initialized on the client.
  ...preloadedState
}
