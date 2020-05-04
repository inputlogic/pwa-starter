// We are going to use ListResource to fetch and display results of
// an API request. You could also use the lower-level [withRequest HoC](https://github.com/inputlogic/elements/tree/master/components/with-request)
import ListResource from '@app-elements/list-resource'

import { Link } from '@app-elements/router'

import url from '/util/url'

// Just some simple styles for this page
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

// In our page component we render a ListResource instance, telling it
// the endpoint to fetch results from, to limit the results to `10`, and
// to render each result item with our `UserItem` component.
const Users = () =>
  <div className='container pt-7 pb-4'>
    <ListResource
      endpoint={url('api.users')}
      limit={10}
      render={UserItem}
    />
  </div>

export default Users
