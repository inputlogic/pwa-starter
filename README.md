<p align="center">
  <a href="#"><img src="https://i.imgur.com/kJ7g4WG.jpg" alt="PWA Starter Logo" width="300" /></a>
  <br />  <br />  <br />
</p>

**PWA-Starter** is a project skeleton for building Single Page & Progressive Web Apps.

The key technology to be familiar with is React. This skeleton embraces
component based architecture, and tries to introduce very few libraries
where an API needs to be learned or memorized. You should have a strong understanding of [React](https://reactjs.org/docs/thinking-in-react.html) and [Hooks](https://reactjs.org/docs/hooks-intro.html).

#### Example Deployments

- [https://pwa-starter.netlify.com/](https://pwa-starter.netlify.com/)
- [https://pwa-starter.herokuapp.com/](https://pwa-starter.herokuapp.com/)

Features
========

- Small bundle size [Why Preact over React?](https://gist.github.com/staydecent/9c43364c8f52e944fdb1100bcc4bae82)
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

**PWA-Starter** is mostly just folder structure. The basic concepts you _need_ to understand are actually broken into Components and Hooks:

- [Routing](https://github.com/inputlogic/elements/tree/master/components/router)
- [Global State](https://github.com/inputlogic/elements/tree/master/components/use-mapped-state)
- [Making Requests](https://github.com/inputlogic/elements/tree/master/components/use-request)
- [Forms](https://github.com/inputlogic/elements/tree/master/components/form)

Cookbook
--------

- [Using a 3rd party React library](https://github.com/inputlogic/pwa-starter/wiki/Using-3rd-Party-React-Libraries-Via-%60preact-compat%60)


Deploying
=========

Heroku
------

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

Netlify
-------

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
