import ListResource from './ListResource'

export default ({endpoint, ...props}) =>
  <ListResource key={`resource-${endpoint}`} list={false} endpoint={endpoint} {...props} />
