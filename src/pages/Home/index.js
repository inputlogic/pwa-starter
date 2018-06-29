import WithState from '/hoc/WithState'
import Actions from './Actions'
import Canvas from './Canvas'

export default () =>
  <WithState mapper={({newImage}) => ({newImage})}>
    {({newImage}) =>
      <div>
        <Canvas img={newImage} />
        <Actions newImage={newImage} />
      </div>}
  </WithState>
