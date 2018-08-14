import Helmet from 'preact-helmet'

import Resource from '/hoc/Resource'

const url = 'https://jsonplaceholder.typicode.com/users/'

export default ({id}) =>
  <div key='user'>
    <Resource endpoint={`${url}${id}`}>
      {({name, email}) =>
        <div>
          <Helmet
            title={name}
          />
          <h1>{name}</h1>
          <p>{email}</p>
          <p><a href='/users'>&larr; Back to all Users</a></p>
        </div>
      }
    </Resource>
    <a href={`/users/${parseInt(id, 10) + 1}`}>Next</a>
  </div>
