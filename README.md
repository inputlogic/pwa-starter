<p align="center">
  <a href="#"><img src="https://i.imgur.com/kJ7g4WG.jpg" alt="PWA Starter Logo" width="300" /></a>
  <br />  <br />  <br />
</p>

**PWA-Starter** is a project skeleton for building Single Page & Progressive Web Apps.

The key technology to be familiar with is React. This skeleton embraces
component based architecture, and tries to introduce very few libraries
where an API needs to be learned or memorized. You should have a strong understanding of [React](https://reactjs.org/docs/thinking-in-react.html) and [Hooks](https://reactjs.org/docs/hooks-intro.html). Other than the default components used, `pwa-starter` is really just a build script and folder structure.


Features
========

- **100/100 Lighthouse score**, right out of the box ([proof](https://lighthouse-dot-webdotdevsite.appspot.com//lh/html?url=https%3A%2F%2Fpwa-starter.netlify.app%2F#))
- Small bundle size ([Why Preact over React?](https://gist.github.com/staydecent/9c43364c8f52e944fdb1100bcc4bae82))
- Pre-rendered pages (via [React Snap](https://github.com/stereobooster/react-snap))
- Efficient networking
- Speedy development
- *Simplicity*


Simplicity
==========

Simplicity is **always** encouraged. Generally, this means Components
that do one thing. If you component definition is getting dense, think about how you can break it up into smaller components, or move functionality into a Hook.


Documentation
=============

- [Setup](#setup)
- [Folder Structure](#folder-structure)
- [Routing](#routing)
- [State Management](#state-management)
- [Data Fetching](#data-fetching)
- [CSS Styles](#css-styles)
- [Deployment](#deployment)
- [Cookbook](#cookbook)


Setup
-----

**PWA-starter** is a [template repository](https://github.blog/2019-06-06-generate-new-repositories-with-repository-templates/). We recommend visiting the following URL to generate your repo from the `pwa-starter` template and then cloning your new repo.

[https://github.com/inputlogic/pwa-starter/generate](https://github.com/inputlogic/pwa-starter/generate)

Once you've generated your repo, clone it, and then simply run:

```bash
npm install
# then
npm start
```

Visit `http://localhost:5000` to view your application.


Folder Structure
----------------

The folder structure of **PWA-Starter** is pretty straightforward. The major structural concept to understand is the `apps/` folders.

- `src/`
  - `consts.js` constant values that will not change during the lifecycle of your app
  - `index.js` the starting point of your app
  - `routes.js` define all of your app routes as well as any API routes
- `src/apps/` Break out your application logic into separate apps, à la Django. More details below.
- `src/assets/` Static assets, such as html, images, fonts, etc.
- `src/elements/` General purpose React Components that are not coupled to an _app_
- `src/store/` Files related to setting up the global store. More details below.
- `src/styles/` General styles setup. More details on styling below.
- `src/util/` Little helper functions.

### The `apps/` Folder

This is where we organize project specific code into logical groupings. Each app will need to export a Component and `{routes}` Object. Inside an _app_ folder you can manage your files how you like. For example, each _page_ could be it's own folder in the _app_ folder like our example `main` app: https://github.com/inputlogic/pwa-starter/tree/master/src/apps/main

Or, you could have screens, elements, modals folder. Or, you could keep it flat with some folders, like our `auth` app: https://github.com/inputlogic/pwa-starter/tree/master/src/apps/auth

The **only** requirement for an _app_ is for the `index.js` file to export a Component to render and a `routes` object. The [included `marketing` app](https://github.com/inputlogic/pwa-starter/blob/master/src/apps/marketing/index.js) is a good basic example.

```javascript
// More details on routing below
export const routes = {
  home: {
    path: url('home'),
    component: Home
  }
}

export function MarketingApp () {
  return (
    <Fragment>
      <Router routes={routes} />
      <MarketingFooter />
    </Fragment>
  )
}
```

The Component exported by your app should include a `<Router />` instance with the local routes object passed in. To include a new app, you would:

1. Create a new folder in `src/apps/`.
2. Create at minimum, an `index.js` file that exports a routes object (could be empty) and a Component to render.
3. Import that Component and routes object in `src/index.js`.
4. Add the app routes and Component to the top-level routes object.

```javascript
// src/index.js
import { MyApp, routes as myAppRoutes } from '/apps/myapp'

// Define our top-level routes
const routes = {
  main: {
    routes: mainRoutes,
    component: MainApp
  },
  // ...
  myapp: {
    routes: myAppRoutes,
    component: MyApp
  }
}
```


Routing
-------

Routing is based on the [`@app-elements/router`](https://www.npmjs.com/package/@app-elements/router). Routes are _statically_ defined. That is, defined outside of the React render tree, which would by _dynamically_ defined.

The details of the `<Router />` Component are covered in the [Router docs](https://www.npmjs.com/package/@app-elements/router#usage).

In **PWA-Starter**, instead of referencing routes directly, like `blog-posts/archive/2013` we have a system for _Named Routes_. All route names are defined in the [`routes.js`](src/routes.js) file. Then, to reference a named route, you use the [`url`](src/util/url.js) util function.

```javascript
const routes = {
  myRoute: '/some/:fancy/:route'
}
url('myRoute', {
  args: {fancy: 12, route: 'r2d2'},
  queries: {search: 'hi'}
})
> '/some/12/r2d2?search=hi'
```


State Management
----------------

By default, **PWA-Starter** is setup with [atom](staydecent/atom), a Redux-inspired state library. The Redux-pattern of state management introduces just a few simple concepts, that allow your code to be [more traceable and maintainable](https://staydecent.ca/code/why-redux-over-global-basic-store/). For simple projects, you could get away with just React Component state, but this can easily get complicated when various Components throughout your render tree, require the same data. Generally, our guideline is if your React component needs to share state with another component, it's usually best to move that state to the global store. The global store being the singular Redux/atom state container.

The [`atom` documentation](https://github.com/staydecent/atom) covers the API functionality, but for a broader overview of the concepts, we recommend [An Introduction to Redux's Core Concepts](https://www.digitalocean.com/community/tutorials/redux-redux-intro).

### The `store/` Folder

The store folder contains our `atom` related code. 

- `store/index.js` initializes the store with your reducers, exports various actions to use.
- `store/initial-state.js` defines the object that your store will be initialized with.
- `store/hooks.js` contains store related hooks that are wrapped, so the store value is already passed in.

If you want to add custom hooks, or reducers you can put them in the `store/` folder. If you end up with lots of custom reducers, you may wish to store them in a `reducers/` folder within each of your `apps`.


Data Fetching
-------------

To load data from an API or back-end server, we recommend using the `useRequest` hook (exported from `store/hooks.js`).

1. First, configure your `API_URL` in [`consts.js`](src/consts.js)
2. Then, configure the `api` namespace in your [`routes.js`](src/routes.js) file
3. Then use the `useRequest` hook in your components!

For details on the `useRequest` hook, refer to the [`@app-elements/use-request` docs](https://github.com/inputlogic/elements/tree/master/components/use-request).


CSS Styles
----------

Not all JavaScript bundlers can guarantee the build order for CSS files. Because of this, we just use [LESS](https://www.npmjs.com/package/less) directly. You can review the [basic build script](bundle-less.js). Much like JavaScript, we use an [`index.less`](src/styles/index.less) file as the starting point. Using the glob plugin, it's easy to include your less files without needing to specify each one individually.

It's encouraged to create your less files [adjacent to the Component](src/elements/global-header) that they style. For more generic styles, they can live in the [`styles/` folder](src/styles).


Deployment
----------

### Heroku

You must add the Pupeteer buildpack for prerendering to work as a build step. Order of buildpacks also matter, and should look as so:

```fish
❯ heroku buildpacks
=== pwa-starter Buildpack URLs
1. https://github.com/jontewks/puppeteer-heroku-buildpack.git
2. heroku/nodejs

Commands for adding multiple build packs:
heroku buildpacks:set https://github.com/jontewks/puppeteer-heroku-buildpack.git
heroku buildpacks:add --index 2 heroku/nodejs
```

### Netlify

1. [Create a new Netlify site](https://app.netlify.com/start)
2. When you get to `Basic build settings`, set the following values:
```
Build command: npm run build
Publish Directory: public
```
3. On the same step, click `Show advanced` to define Environment Variables
```
NODE_ENV: netlify
```

If you encounter a deploy error on Netlify like:

```
TypeError: Failed to fetch dynamically imported module: http://localhost:45678/module/index.js
```

You can try increasing the `sleep` time in [package.json](/package.json). There seems to be the occassional race condition related to the file system on Netlify, where the cacheBuster rewrites the js and css includes in `index.html` to have a timestamp, but react-snap is invoked with the old `index.html`.


Cookbook
--------

- [Using a 3rd party React library](https://github.com/inputlogic/pwa-starter/wiki/Using-3rd-Party-React-Libraries-Via-%60preact-compat%60)
- [Replacing `atom` with `Redux`](https://github.com/inputlogic/pwa-starter/wiki/Replacing-atom-with-Redux)
- [Replacing `Preact` with `React`](https://github.com/inputlogic/pwa-starter/wiki/Replacing-Preact-with-React)
