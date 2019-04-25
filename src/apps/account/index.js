import asyncComponent from '/elements/async-component'

const LazyAccount = asyncComponent(() =>
  import('./account.js').then(m => m.default)
)

export default LazyAccount
