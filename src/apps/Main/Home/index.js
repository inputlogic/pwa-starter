import W from 'wasmuth'

import Carousel from '/elements/Carousel'

export default () =>
  <div>
    <h1>Home</h1>
    <Carousel withDots>
      {W.map((hex) =>
        <img src={`http://www.placehold.it/400x300/${hex}/f44?text=${hex}`} style='width: 100%;' />,
      ['fff', 'a7c', '09d', '411', '111'])}
    </Carousel>
  </div>
