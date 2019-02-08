import Helmet from '@app-elements/helmet'
import { Resource } from '@app-elements/list-resource'

import urlFor from '/util/urlFor'

import { WEB_URL } from '/consts'

const url = 'https://jsonplaceholder.typicode.com/users/'

const User = ({ id }) =>
  <div key='user'>
    <Resource endpoint={`${url}${id}`}>
      {({ name, email }) =>
        <div>
          <Helmet
            title={name}
            meta={[
              { name: 'description', content: 'Helmet description' },
              { property: 'og:type', content: 'article' },
              { property: 'og:title', content: name },
              { property: 'og:description', content: 'Helmet description' },
              { property: 'og:image', content: 'https://www.gooseinsurance.com/images/blog-image-1.jpg' },
              { property: 'og:url', content: `${WEB_URL}${urlFor('user', { args: { id } })}` }
            ]}
          />
          <h1>{name}</h1>
          <p>{email}</p>
          <p><a href='/users'>&larr; Back to all Users</a></p>
        </div>
      }
    </Resource>
    <a href={`/users/${parseInt(id, 10) + 1}`}>Next</a>
  </div>

export default User
