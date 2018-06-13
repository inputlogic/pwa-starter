import WithState from '/hoc/WithState'

export default () =>
  <WithState mapper={({newImage}) => ({newImage})}>
    {({newImage}) =>
      newImage
        ? null
        : <header class='layout-center'>
          <h1>Daily</h1>
        </header>
    }
  </WithState>
