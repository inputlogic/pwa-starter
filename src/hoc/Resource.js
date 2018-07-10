import ListResource from './ListResource'

export default ({url, ...props}) =>
  <ListResource key={`resource-${url}`} list={false} url={url} {...props} />
