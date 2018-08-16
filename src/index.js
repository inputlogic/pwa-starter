import Preact from 'preact'

// Entry Point of Your App
// -----------------------

// `src/index.js` contains your top-most Component and is the entry point
// for your entire app.

// Here, we import Components we want to render on *all* routes. For example,
// we include a global Header, Notification bar, and a *NotFound* component
// which renders when no route is matched.
// (If your app does not need these global elements, you can of course remove them.)
import Header from '/elements/Header'
import Notification from '/elements/Notification'
import NotFound from '/elements/NotFound'

// [Apps](hoc/Apps.html) is a Higher Order Component for breaking out your
// routes into logical groupings. For ex., Account, Main, Admin, Marketing etc.
import Apps from '/hoc/Apps'

// Helmet is minimal alternative to [react-helmet](https://github.com/nfl/react-helmet).
// It will render title, og and meta tags on the server, as well as update the document
// title when navigating on the client.
import Helmet from '/hoc/Helmet'

import routes from '/routes'

// ### Styling

// We use LESS for styling. And ideally, each element Component will
// import a `style.less` file in the same directory. This allows us to
// organize styles based on Component organization, without drastically
// changing the way we write CSS.

// In this case, we are loading the global styles.
import '/styles/variables.less'
import '/styles/base.less'

// And, finally, our MainApp! This is the top-level Component to render
// into the DOM, and kick-start our app!
export const MainApp = () =>
  <div className='main-app-container' >
    <Helmet
      title='Welcome'
      titleTemplate='PWA Starter | %s'
      defaultTitle='Welcome'
    />

    <Header />
    <Notification />

    <Apps routes={routes} />

    <NotFound />
  </div>

// Only render if we are in the browser, server-side rendering will be
// handled by the `server` (which is not covered here).
if (typeof window !== 'undefined') {
  Preact.render(
    <MainApp />,
    document.body, document.body.children[0]
  )
}

// Contents
// --------

// **/**

// - [consts.js](/consts.html)
// - [routes.js](/routes.html)
// - [store.js](/store.html)

// **apps/**

// This is where we organize project specific code into logical groupings.
// Each app will need to export a Component and `{routes}` Object.

// **assets/**

// Put any static files you want copied over to the `public/` folder.

// **elements/**

// Elements are reusable Components that render some JSX. These are generic
// and are common to use throughout all apps.

// - [Carousel.js](/elements/Carousel)
// - [Dropdown.js](/elements/Dropdown)
// - [Image.js](/elements/Image)
// - [Level.js](/elements/Level)
// - [LoadingIndicator.js](/elements/LoadingIndicator)
// - [Modal.js](/elements/Modal)
// - [Notification.js](/elements/Notification)
// - [Pagination.js](/elements/Pagination)
// - [Tooltip.js](/elements/Tooltip)
// - [Form.js](/elements/Form)
// - [Header.js](/elements/Header)
// - [NotFound.js](/elements/NotFound)

// **hoc/**

// Higher order Components, which abstract away logic, and generally
// don't render any JSX of their own.

// - [Apps.js](/hoc/Apps)
// - [Helmet.js](/hoc/Helmet)
// - [ListResource.js](/hoc/ListResource)
// - [Resource.js](/hoc/Resource)
// - [Router.js](/hoc/Router)
// - [WithRequest.js](/hoc/WithRequest)
// - [WithState.js](/hoc/WithState)

// **modals/**

// Any global (cross-app) modals can go here. These should all use the
// [Modal](/elements/Modal) element in their `render` method.

// **styles/**

// Global LESS files can go here. They should be manually imported by
// `src/index.js`

// **util/**

// Simple helper functions used throughout your project. These should not
// be removed as they are all used by an included HoC or element.
