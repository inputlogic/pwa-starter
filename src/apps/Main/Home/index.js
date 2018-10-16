import W from 'wasmuth'
import Tooltip from '@app-elements/tooltip'
import Image from '@app-elements/image'

import Carousel from '/elements/Carousel'
import Dropdown from '/elements/Dropdown'
import LoadingIndicator from '/elements/LoadingIndicator'

import {showNotification} from '/elements/Notification'

import {setState} from '/store'

export default () =>
  <div style={{padding: '1em'}}>
    <h1><Tooltip text='This is your tooltip'>Home</Tooltip></h1>

    <LoadingIndicator />

    <Dropdown uid='home-example'>
      <p><button onClick={ev => setState({modal: 'ExampleModal'})}>Open Example Modal</button></p>
      <p><button onClick={ev => showNotification({message: 'PIRATES!'})}>Pirates!</button></p>
      <p>Classy Penguin</p>
    </Dropdown>

    <Carousel withDots>
      {W.map(
        (hex) => <Image
          src={`http://www.placehold.it/400x300/${hex}/f44?text=${hex}`}
          unloadedSrc={`http://www.placehold.it/400x300/eee/eee?text=Loading`}
          style='width: 100%'
        />,
        ['fff', 'a7c', '09d', '411', '111']
      )}
    </Carousel>
  </div>
