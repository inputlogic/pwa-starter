![PWA Starter](https://i.imgur.com/kJ7g4WG.jpg)

**PWA-Starter** is a project skeleton for building Single Page Apps and/or
Progressive Web Apps.

The key technology to be familiar with is React. This skeleton embraces
component based architecture, and tries to introduce very few libraries
where an API needs to be learned or memorized. To facilitate this, we
embrace [Higher Order Components](https://reactjs.org/docs/higher-order-components.html) (HoC) and [renderProps](https://reactjs.org/docs/render-props.html#use-render-props-for-cross-cutting-concerns). You should be familiar
with both terms, along with General [React](https://reactjs.org/docs/thinking-in-react.html) and [JSX](https://reactjs.org/docs/introducing-jsx.html) knowledge.

#### Example Deployments

- [https://pwa-starter.netlify.com/](https://pwa-starter.netlify.com/)
- [https://pwa-starter.herokuapp.com/](https://pwa-starter.herokuapp.com/)

Focus
=====

- Small bundle size
- Efficient networking
- Speedy development
- *Simplicity*

Simplicity
==========

Simplicity is **always** encouraged. Generally, this means Components
that do one thing. For example, the [WithRequest](/hoc/WithRequest.html)
HoC, only manages one request. It could be modified in order to handle
multiple requests, but you're encouraged to build Components that handle
one resource.

Documentation
=============

[http://pwa-starter.surge.sh/](http://pwa-starter.surge.sh/)

To enable/configure PWA features (including icons), follow [this guide](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/#support_native_integration).

[React Style Guide](https://github.com/inputlogic/styleguides/blob/master/react.md)

[Why Preact over React?](https://gist.github.com/staydecent/9c43364c8f52e944fdb1100bcc4bae82)

[Hooks Intro](https://reactjs.org/docs/hooks-intro.html)

[Thinking in React](https://reactjs.org/docs/thinking-in-react.html)

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

Nothing! Well, setup a site at [netlify.com](https://netlify.com), then keep pushing to master.
