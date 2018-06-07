import {get} from '/store'

const Base = () =>
  <div>
    Not Found :(
  </div>

export default (props) =>
  !get('route') ? Base() : null
