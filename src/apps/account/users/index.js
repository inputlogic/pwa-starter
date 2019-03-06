import ListResource from '@app-elements/list-resource'

import './users.less'

const UserItem = ({ id, name, email }) =>
  <div class='user-item'>
    <h2><a href={`/users/${id}`}>{name}</a></h2>
    <p>{email}</p>
  </div>

const Users = () =>
  <ListResource
    endpoint='https://jsonplaceholder.typicode.com/users'
    limit={10}
    render={UserItem}
  />

export default Users
