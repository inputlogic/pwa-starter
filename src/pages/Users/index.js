import WithRequests from '/hoc/WithRequests'

const url = 'https://jsonplaceholder.typicode.com/users'

const User = ({id, name, email}) =>
  <div>
    <h2><a href={`/users/${id}`}>{name}</a></h2>
    <p>{email}</p>
  </div>

export default () =>
  <WithRequests requests={{users: {url}}}>
    {({users = [], isLoading}) =>
      <div>
        {isLoading
          ? <h3>Loading...</h3>
          : users.map(User)
        }
      </div>
    }
  </WithRequests>
