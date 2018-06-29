import {getState} from '/store'

const Base = () =>
  <div>
    Not Found :(
  </div>

export default (props) =>
  !getState().route ? Base() : null
