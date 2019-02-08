import W from 'wasmuth'

import Carousel from '@app-elements/carousel'
import Dropdown from '@app-elements/dropdown'
import Image from '@app-elements/image'
import LoadingIndicator from '@app-elements/loading-indicator'
import Tooltip from '@app-elements/tooltip'

import { showNotification } from '@app-elements/notification'

import { setState } from '/store'

const Home = () =>
  <div style={{ padding: '1em' }}>
    <h1><Tooltip text='This is your tooltip'>Home</Tooltip></h1>

    <LoadingIndicator />

    <Dropdown uid='home-example'>
      <p><button onClick={ev => setState({ modal: 'ExampleModal' })}>Open Example Modal</button></p>
      <p><button onClick={ev => showNotification({ message: 'PIRATES!' })}>Pirates!</button></p>
      <p>Classy Penguin</p>
    </Dropdown>

    <Carousel withDots>
      {W.map(
        (hex) => <Image
          srcs={[
            'http://www.placehold.it/400x300/eee/eee?text=Loading',
            `http://www.placehold.it/400x300/${hex}/f44?text=${hex}`
          ]}
          style='width: 100%'
        />,
        ['fff', 'a7c', '09d', '411', '111']
      )}
    </Carousel>
  </div>

export default Home
