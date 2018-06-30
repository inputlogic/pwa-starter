import WithRequests from '/hoc/WithRequests'

const url = 'https://jsonplaceholder.typicode.com/users/'

export default ({id}) =>
  <WithRequests requests={{user: {url: `${url}${id}`}}}>
    {({user = [], isLoading}) =>
      <div>
        {isLoading
          ? <h3>Loading...</h3>
          : <div>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
          </div>}
        <p><a href='/users'>&larr; Back to all Users</a></p>
      </div>
    }
  </WithRequests>
