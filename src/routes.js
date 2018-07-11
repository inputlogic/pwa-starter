import mainRoutes from '/apps/Main/routes'
import accountRoutes from '/apps/Account/routes'

// Define all routes here so `urlFor` works
export const allRoutes = {
  Main: mainRoutes,
  Account: accountRoutes
}

export default allRoutes
