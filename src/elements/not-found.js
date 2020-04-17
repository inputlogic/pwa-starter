import connect from '@app-elements/connect'

const Base = () =>
  <div className='container pt-10'>
    Not Found :(
  </div>

const NotFound = connect({
  name: 'NotFound',
  withState: ({ currentRoute }) => ({ currentRoute })
})(({ currentRoute }) =>
  !currentRoute ? Base() : null
)

export default NotFound
