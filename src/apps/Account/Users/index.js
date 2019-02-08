import ListResource from '@app-elements/list-resource'

const endpoint = 'https://jsonplaceholder.typicode.com/users'

const Users = () =>
  <ListResource endpoint={endpoint}>
    {({ id, name, email }) =>
      <div>
        <h2><a href={`/users/${id}`}>{name}</a></h2>
        <p>{email}</p>
      </div>}
  </ListResource>

export default Users
