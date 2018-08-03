import WithState from '/hoc/WithState'

export default () =>
  <WithState mapper={({newImage}) => ({newImage})}>
    {({newImage}) =>
      <div>
        <h1>Home</h1>
      </div>}
  </WithState>
