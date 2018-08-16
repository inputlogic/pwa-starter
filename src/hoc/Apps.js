// This nifty little Component let's us group routes together into "Apps".
// Which is helpful if, say, one grouping of routes shares a particular
// header or navigation Component, and another grouping shares a different
// set of components.

// Breaking apart routes also helps keep things tidy with larger projects.

import W from 'wasmuth'

// **Apps** extends [WithState](/hoc/WithState.html) in order to stay updated
// with the `currentPath` value. Any time the `currentPath` changes, `Apps`
// will determine which "app" Component to render.
import WithState from '/hoc/WithState'

// We borrow route matching logic from our `Router`. [Router](/hoc/Router.html)
// also hijacks clicks on `<a />` tags to keep `currentPath` updated in our
// global state.
import {exec} from '/hoc/Router'

// And, we'll need our `App => Object` route pairs.
import routes from '/routes'

export default class Apps extends WithState {
  render () {
    // `_mappedState` is the namespace `WithState` uses to store what
    // `this.props.mapper` returns. In this case, we want our `currentPath`
    // reference.
    const {currentPath} = this.state._mappedState

    // When called on a route (an Object with a `path` property), it will
    // return true if it matches currentPath.
    const routeMatches = r => exec(currentPath, r.path)

    // We iterate our `App => Object` route pairs. And when a match
    // is found, we render that App
    for (let [App, appRoutes] of routes) {
      if (W.find(routeMatches, Object.values(appRoutes))) {
        return <App />
      }
    }

    return null
  }
}

// Set the `mapper` prop which `WithState` will use to return a part of
// our global state from our [store](/store.html).
Apps.defaultProps = {mapper: ({currentPath}) => ({currentPath})}
