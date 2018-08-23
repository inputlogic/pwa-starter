// `<Router />`'s accept two object formats. The first, which we'll cover now, is for
// defining a parent Component for a group of routes. These parent Components are
// referred to as "Apps". The parent component (or App) can render some global header
// or navigation type components that will render for all child routes.

// For example, you could have one set of header, footer, navigation type components
// for your landing or marketing routes. And these will be rendered for all marketing
// routes (aka your "Marketing" *App*), and not re-render when navigating between
// marketing routes. Then when you navigate to, say, your Admin *App* (or set of routes),
// those shared Marketing components will unmount, and whatever is contained in the
// Admin Component will be rendered.

// We break out these top-level routes, or Apps, into the `src/apps` folder. Each
// folder within `src/apps` should have an `index.js` that exports a Component as
// `default` and a `routes` const.

import Main, {routes as mainRoutes} from '/apps/Main'
import Account, {routes as accountRoutes} from '/apps/Account'

// These app routes need to be defined here (outside of a Component's render function)
// so that our [urlFor](/util/urlFor.html) function works without mounting any React
// Components. These also get passed into a `<Router />` inside the [MainApp](/index.html)
// Component and only render if a path within their `routes` object is currently matched.
export default {
  main: {
    routes: mainRoutes,
    component: Main
  },
  account: {
    routes: accountRoutes,
    component: Account
  }
}

// The `routes` props for the `main` and `account` objects above, follow the second object
// format that our `<Router />`'s understand. Which follows the follwing signature:

// ```
// export const mainRoutes = {
//   routeName: {
//     path: '/',
//     component: Home
//   }
// }
// ```
