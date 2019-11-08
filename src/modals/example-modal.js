import Modal from '@app-elements/modal'

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
            <button className='btn btn-ghost'>Cancel</button>
            <button className='btn'>Yes</button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
