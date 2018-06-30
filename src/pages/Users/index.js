import ListResource from '/hoc/ListResource'

const url = 'https://jsonplaceholder.typicode.com/users'

export default () =>
  <ListResource url={url}>
    {({id, name, email}) =>
      <div>
        <h2><a href={`/users/${id}`}>{name}</a></h2>
        <p>{email}</p>
      </div>}
  </ListResource>
