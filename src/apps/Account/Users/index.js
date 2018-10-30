import ListResource from '@app-elements/list-resource'

const endpoint = 'https://jsonplaceholder.typicode.com/users'

export default () =>
  <ListResource endpoint={endpoint}>
    {({id, name, email}) =>
      <div>
        <h2><a href={`/users/${id}`}>{name}</a></h2>
        <p>{email}</p>
      </div>}
  </ListResource>
