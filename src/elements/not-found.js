import { useMappedState } from '@app-elements/use-mapped-state'

import store from '/store'

const Base = () =>
  <div className='container pt-10'>
    Not Found :(
  </div>

const NotFound = () => {
  const currentRoute = useMappedState(store, ({ currentRoute }) => currentRoute)

  return !currentRoute ? Base() : null
}

export default NotFound
