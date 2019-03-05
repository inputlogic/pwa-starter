**PWA-Starter** is a project skeleton for building Single Page Apps and/or
Progressive Web Apps.

The key technology to be familiar with is React. This skeleton embraces
component based architecture, and tries to introduce very few libraries
where an API needs to be learned or memorized. To facilitate this, we
embrace Higher Order Components (HoC) and renderProps. You should be familiar
with both terms, along with General React and JSX knowledge.
(@TODO: Link to resources)

Focus
-----

- Small bundle size
- Efficient networking
- Speedy development
- *Simplicity*

Simplicity
----------

Simplicity is **always** encouraged. Generally, this means Components
that do one thing. For example, the [WithRequest](/hoc/WithRequest.html)
HoC, only manages one request. It could be modified in order to handle
multiple requests, but you're encouraged to build Components that handle
one resource.

Documentation
-------------

[http://pwa-starter.surge.sh/](http://pwa-starter.surge.sh/)

Deploying
---------

Heroku
======

You must add the Pupeteer buildpack for prerendering to work as a build step. Order of buildpacks also matter, and should look as so:

```fish
❯ heroku buildpacks
=== pwa-starter Buildpack URLs
1. https://github.com/jontewks/puppeteer-heroku-buildpack.git
2. heroku/nodejs
```
