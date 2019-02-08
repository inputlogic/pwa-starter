import connect from '@app-elements/connect'

const Base = () =>
  <div>
    Not Found :(
  </div>

const NotFound = connect({
  name: 'NotFound',
  withState: ({ currentRoute }) => ({ currentRoute })
})(({ currentRoute }) =>
  !currentRoute ? Base() : null
)

export default NotFound
