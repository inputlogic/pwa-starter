// Here we define our routes as `Component => Object` pairs. This allows us to
// define a parent ("app") Component to render when one of the asociated
// routes is matched. The matching logic is contained in the `Apps` Component.

import Main, {routes as mainRoutes} from '/apps/Main'
import Account, {routes as accountRoutes} from '/apps/Account'
import UserApp, {routes as userRoutes} from '/apps/Account/UserApp'

// Defining the routes in this way allows our `urlFor` function to work
// without having to wait on any Components to render. This is why routes
// are not defined as child Components like `react-router`.

export const routes = [
  [Main, mainRoutes],
  [Account, accountRoutes],
  [UserApp, userRoutes]
]

// `mainRoutes` and `accountRoutes` and any other routes you want to add
// will look something like this: `{routeName: {path: '/path', Page: Component}}`

export default routes
