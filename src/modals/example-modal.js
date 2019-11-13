import Modal from '@app-elements/modal'

import { setState } from '/store'

export default function ExampleModal () {
  return (
    <Modal className='styled-modal small'>
      <div className='modal-header'>
        <h2>Example Modal</h2>
      </div>
      <form action=''>
        <div className='modal-scrollview'>
          <div className='content centered'>
            <h3>Lorem ipsum dolor sit amet</h3>
          </div>
          <div className='actions centered'>
            <button onClick={ev => setState({ modal: null })} className='btn btn-ghost'>Cancel</button>
            <button onClick={ev => setState({ modal: null })} className='btn'>Yes</button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
