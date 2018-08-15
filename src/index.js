import Preact from 'preact'

// PWA-Starter is a project skeleton for building Single Page Apps and/or
// Progressive Web Apps.

// The key technology to be familiar with is React. This skeleton embraces
// component based architecture, and tries to introduce very few libraries
// where an API needs to be learned or memorized. To facilitate this, we
// embrace Higher Order Components (HoC) and renderProps. You should be familiar
// with both terms, along with General React and JSX knowledge.
// (@TODO: Link to resources)

// Focus
// -----

// - Small bundle size
// - Efficient networking
// - Speedy development
// - *Simplicity*

// Simplicity
// ----------

// Simplicity is **always** encouraged. Generally, this means Components
// that do one thing. A real world example of this: A former iteration of
// this starter had a `WithRequests` utility function that let you define
// any number of requests and bound the results to a child Component.

// In PWA-Starter there is a `WithRequest` HoC, that only manages one request.
// As your Components should be as simple as possible, a Component should
// not manage more than one resource.

// Another example, is embracing HoC to be used within your JSX, rather
// than utility functions:

// This:

// `<WithRequest request={{...}}>...</WithRequest>``

// Rather than this:

// `withRequest({...})(Child)`

// Entry Point and Root Files
// --------------------------

// `src/index.js` contains your top-most Component and is the entry point
// for your entire app.

// Here, we import Components we want to render on *all* routes. For example,
// we include a global Header, Notification bar, and a *Not Found* component
// which renders when no route is matched.
// (If your app does not need a global Header, you can of course remove it.)
import Header from '/elements/Header'
import Notification from '/elements/Notification'
import NotFound from '/elements/NotFound'

// Apps is a Higher Order Component for breaking out your routes into
// logical groupings. For ex., Account, Main, Admin, Marketing etc.
// See [Apps](/docs/Apps.html) for more details.
import Apps from '/hoc/Apps'

// Helmet is minimal alternative to react-helmet. It will render title,
// og and meta tags on the server, as well as update the document title
// when navigating on the client.
import Helmet from '/hoc/Helmet'

// ### Styling

// We use LESS for styling. And ideally, each element Component will
// import a `style.less` file in the same directory. This allows us to
// organize styles based on Component organization, without drastically
// changing the way we write CSS.

// In this case, we are loading the global styles.
import '/styles/variables.less'
import '/styles/base.less'

// And, finally, our MainApp!
export const MainApp = () =>
  <div className='main-app-container' >
    <Helmet
      title='Welcome'
      titleTemplate='PWA Starter | %s'
      defaultTitle='Welcome'
    />

    <Header />
    <Notification />

    <Apps />

    <NotFound />
  </div>

// Only render if we are in the browser, server-side rendering will be
// handled by `server/index.js`
if (typeof window !== 'undefined') {
  Preact.render(
    <MainApp />,
    document.body, document.body.children[0]
  )
}
