import Preact from 'preact'

// Entry Point of Your App
// -----------------------

// `src/index.js` contains your top-most Component that will be mounted to the DOM and
// is the entry point for your entire app. Everything starts here!

// We use [atom](https://github.com/staydecent/atom) for global state management.
// It is a tiny alternative to Redux, yet maintains compatibility with Redux DevTools!
// import {Provider} from 'atom/preact'

// [inputlogic/elements](https://github.com/inputlogic/elements) houses common Components
// that many PWAs will end up needing. In this case, we are importing Helmet for managing
// title and meta tags, Notification for displaying notifications, and Router which may be
// the most important Component of all.
import Helmet from '@app-elements/helmet'
import Notification from '@app-elements/notification'
import Router from '@app-elements/router'

// Here, we import Components we want to render on *all* routes. For example,
// we include a global Header, and a *NotFound* component which renders when no route is
// matched. (If your app does not need these global elements, you can of course remove them.)
import Header from '/elements/Header'
import NotFound from '/elements/NotFound'

// The main [routes](/routes.html) file defines the top-level routes and their respective
// Components.
import routes from '/routes'

// And our apps' global store.
import store, {Provider} from '/store'

// ### Styling

// We use LESS for styling. And ideally, each element Component will
// import a `style.less` file in the same directory. This allows us to
// organize styles based on Component organization, without drastically
// changing the way we write CSS.

// In this case, we are loading the global styles.
import '/styles/variables.less'
import '/styles/base.less'

// And, finally, our RootApp! This is the top-level Component to render
// into the DOM and kick-start our entire app!

// First, our entire app is wrapped in the _atom_ `Provider` component.
// This adds the store to the React context, meaning any child can access our
// store reference.
// Then we include those Component's that we want to be rendered on *all* routes.
export const RootApp = () =>
  <Provider store={store}>
    <div className='main-app-container' >
      <Helmet
        title='Welcome'
        titleTemplate='PWA Starter | %s'
        defaultTitle='Welcome'
      />

      <Header />
      <Notification />

      <Router routes={routes} />

      <NotFound />
    </div>
  </Provider>

// Only render if we are in the browser, server-side rendering will be
// handled by the `server` (which is not covered here).
if (typeof window !== 'undefined') {
  Preact.render(
    <RootApp />,
    document.body, document.body.children[0]
  )
}

// Contents
// --------

// **/**

// - [consts.js](/consts.html)
// - [routes.js](/routes.html)
// - [initialState.js](/initialState.html)

// **apps/**

// This is where we organize project specific code into logical groupings.
// Each app will need to export a Component and `{routes}` Object.

// **assets/**

// Put any static files you want copied over to the `public/` folder.

// **elements/**

// Elements are reusable Components that render some JSX. These are generic
// and are common to use throughout all apps.

// - [Header.js](/elements/Header)
// - [NotFound.js](/elements/NotFound)

// **modals/**

// Any global (cross-app) modals can go here. These should all use the
// [Modal](https://github.com/inputlogic/elements/tree/master/packages/Modal) element in their `render` method.

// - [ExampleModal.js](/modals/ExampleModal)

// **styles/**

// Global LESS files can go here. They should be manually imported by
// `src/index.js`

// **util/**

// Simple helper functions used throughout your project.
