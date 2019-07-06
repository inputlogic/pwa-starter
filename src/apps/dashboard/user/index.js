// Here is a page that will display details about a specific resource.
// In our case, it will be a user specified by the current routes `:id`
// segment.

// We'll include Helmet for setting title and meta tags dynamically,
// based on the result of our API request.
// And we'll use the `<Resource />` component which is a convenient
// wrapper around using `withRequest`.
import Helmet from '@app-elements/helmet'
import { Resource } from '@app-elements/list-resource'

// `urlFor` is a util for getting route paths by name. It's a project
// level util because it reads the statically defined [routes.js](/routes.html)
import urlFor from '/util/urlFor'

// `WEB_URL` is based no the currrent URL. If you are browsing the site
// via `http://localhost:3000` then `WEB_URL` will represent that.
import { WEB_URL } from '/consts'

// This is the component that Resource will use to render the result
// of the API request.
const UserDetails = ({ id, name, email }) =>
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

// And our page component which includes an instance of `<Resource />`
// making a request based on the `{ id }` prop passed down by the `<Router />`
const User = ({ id }) =>
  <div key='user'>
    <Resource
      endpoint={`https://jsonplaceholder.typicode.com/users/${id}`}
      render={UserDetails}
      id={id}
    />
    {parseInt(id, 10) < 10 &&
      <a href={`/users/${parseInt(id, 10) + 1}`}>Next</a>
    }
  </div>

export default User
