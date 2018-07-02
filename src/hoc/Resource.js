import ListResource from './ListResource'

export default ({url, ...props}) =>
  <ListResource list={false} url={url} {...props} />
