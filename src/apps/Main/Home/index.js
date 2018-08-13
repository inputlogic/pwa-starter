import W from 'wasmuth'

import Carousel from '/elements/Carousel'
import Dropdown from '/elements/Dropdown'
import LoadingIndicator from '/elements/LoadingIndicator'

import {setState} from '/store'

export default () =>
  <div style={{padding: '1em'}}>
    <h1>Home</h1>

    <LoadingIndicator />

    <Dropdown uid='home-example'>
      <p><button onClick={ev => setState({modal: 'ExampleModal'})}>Open Example Modal</button></p>
      <p>Pirate</p>
      <p>Classy Penguin</p>
    </Dropdown>

    <Carousel withDots>
      {W.map((hex) =>
        <img src={`http://www.placehold.it/400x300/${hex}/f44?text=${hex}`} style='width: 100%;' />,
      ['fff', 'a7c', '09d', '411', '111'])}
    </Carousel>
  </div>
