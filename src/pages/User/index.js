import Resource from '/hoc/Resource'

const url = 'https://jsonplaceholder.typicode.com/users/'

export default ({id}) =>
  <Resource url={`${url}${id}`}>
    {({name, email}) =>
      <div>
        <h1>{name}</h1>
        <p>{email}</p>
        <p><a href='/users'>&larr; Back to all Users</a></p>
      </div>
    }
  </Resource>
