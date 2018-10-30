export default {
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
