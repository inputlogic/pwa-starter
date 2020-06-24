import { Link } from '@app-elements/router'
import { LoadingIndicator } from '@app-elements/loading-indicator'
import { useRequest } from '@app-elements/use-request'

import { url } from '/util/url'

import './users.less'

// We need to define a Component that represents each item returned
// from the API request. In our case, the API response looks like:
//   [
//     { id, name, email },
//     ...
//   ]
const UserItem = ({ id, name, email }) =>
  <div class='user-item'>
    <h2><Link name='user' args={{ id }}>{name}</Link></h2>
    <p>{email}</p>
  </div>

export function Users (props) {
  const { result, isLoading } = useRequest(this.context.store, url('api.users', { args: { limit: 10 } }))
  return (
    <div className='container pt-7 pb-4'>
      {isLoading && <LoadingIndicator />}
      {result != null && result.map(UserItem)}
    </div>
  )
}
