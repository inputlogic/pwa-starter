import ListResource from '@app-elements/list-resource'

const endpoint = 'https://input-qee-prod.herokuapp.com/videos'

export default () =>
  <ListResource endpoint={endpoint} limit={5} pagination>
    {({title}) =>
      <div>
        <h2>{title}</h2>
      </div>
    }
  </ListResource>
