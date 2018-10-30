import {connect} from 'unistore/preact'

const Base = () =>
  <div>
    Not Found :(
  </div>

const NotFound = connect('currentRoute', {})(({currentRoute}) =>
  !currentRoute ? Base() : null
)

export default NotFound
