import { render } from 'preact'
import Helmet from '@app-elements/helmet'

import { store, Provider } from '/store'

export const Root = () =>
  <Provider store={store}>
    <Helmet
      title='Welcome'
      titleTemplate='PWA Starter | %s'
      defaultTitle='Welcome'
    />
    <h1>Root</h1>
  </Provider>

render(<Root />, document.body)
