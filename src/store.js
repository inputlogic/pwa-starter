import {DEBUG} from '/consts'

// PWA-Starter uses a very basic *store* for global state.
// Any time you need to share state outside of a single Component,
// you can use this `/store.js`.

// We don't use Redux. We found actions and reducers introduced complexity
// and boilerplate, that was not necessary, even for large projects.

// First we define our inital state object.

const state = {
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

// This is a private reference to Component instances that will be updated
// after every `setState`.

const components = []

// Instead of passing in functions to call when state is changed, we pass in
// Component instances. The easiest way to do so is in a Component's contructor:

// `this.state = subscribe(this)`

// this adds the Component instance to the array of components to update on state
// changes, and returns the current state to set as the Component state. This makes
// for very fast prototyping, and when needed, you can implement `shouldComponentUpdate`
// logic on your Component to improve performance.
export const subscribe = component => {
  components.push(component)
  return getState()
}

// If you subscribe a Component instance, you need to remove it when the Component
// is being destoyed:

// ```
// componentWillUnmount () {
//   unsubscribe(this)
// }
// ```

// `unsubscribe` simply removes the component from the local components array.
export const unsubscribe = component => {
  const idx = components.findIndex(c => c === component)
  idx > -1 && components.splice(idx, 1)
}

// `getState` returns the current state. `Object.freeze` is used, to return
// an immutable copy of the state object. Well, almost. It's only a shallow
// immutable copy. You should avoid mutations on nested objects and arrays,
// as they will sync back to the global state. For now, I figure PRs can
// catch this misuse. But, if it proves a problem, then a deep `Object.freeze`
// could be implemented.
export const getState = () => Object.freeze({...state})

// Just like React `setState`. If `DEBUG` is true, will log to console. And, of
// course, it will iterate the subscribed components and call `component.setState`
// on each of them.
export const setState = updatedState => {
  Object.assign(state, updatedState)
  DEBUG && console.log('setState', updatedState, state)
  components.forEach(c => c.setState(state))
}

// And lastly, a helper to change state on click events. Often used on `<button />`'s.

// `<button onClick={clickState(state => ({clicks: state.clicks + 1}))}>Click Me</button>`
export const clickState = state => ev => {
  ev.preventDefault()
  setState(
    typeof state === 'function'
      ? state(getState(), ev)
      : state
  )
}
