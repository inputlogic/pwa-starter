import { Link } from '@app-elements/router'
import { LoadingIndicator } from '@app-elements/loading-indicator'

import { useRequest, useStorePath } from '/store/hooks'
import { url } from '/util/url'

// We need to define a Component that represents each item returned
// from the API request. In our case, the API response looks like:
//   [
//     { id, name, email },
//     ...
//   ]
const UserItem = ({ id, name, email }) =>
  <div className='user-item'>
    <h2><Link name='user' args={{ id }}>{name}</Link></h2>
    <p>{email}</p>
  </div>

export function Users (props) {
  const [clicks, setClicks] = useStorePath('nested.clicks')
  const { result, isLoading } = useRequest(url('api.users', { args: { limit: 10 } }))
  return (
    <div className='container pt-7 pb-4'>
      <button onClick={() => setClicks((clicks || 0) + 1)}>Count: {clicks}</button>
      {isLoading && <LoadingIndicator />}
      {result != null && result.map(UserItem)}
    </div>
  )
}
