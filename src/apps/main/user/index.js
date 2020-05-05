import Helmet from '@app-elements/helmet'
import LoadingIndicator from '@app-elements/loading-indicator'
import { Link } from '@app-elements/router'
import { useRequest } from '@app-elements/use-request'

import url from '/util/url'

import { WEB_URL } from '/consts'

export function User ({ id }) {
  const { store } = this.context
  const { result, error, isLoading } = useRequest(store, url('api.user', { args: { id } }))

  if (isLoading) {
    return <div className='container mt-2'><LoadingIndicator /></div>
  }

  if (error != null) {
    return error.code === 404
      ? <div><p>A user with that ID was not found!</p></div>
      : <div><p>Something went wrong!</p></div>
  }

  const { name, email } = result

  return (
    <div key='user' className='container pt-7'>
      <Helmet
        title={name}
        meta={[
          { name: 'description', content: 'Helmet description' },
          { property: 'og:type', content: 'article' },
          { property: 'og:title', content: name },
          { property: 'og:description', content: 'Helmet description' },
          { property: 'og:image', content: 'https://www.gooseinsurance.com/images/blog-image-1.jpg' },
          { property: 'og:url', content: `${WEB_URL}${url('user', { args: { id } })}` }
        ]}
      />
      <h1>{name}</h1>
      <p>{email}</p>
      <p><Link name='users'>&larr; Back to all users</Link></p>
      {parseInt(id, 10) < 10 &&
        <Link name='user' args={{ id: parseInt(id, 10) + 1 }}>Next</Link>}
    </div>
  )
}
