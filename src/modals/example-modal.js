import { Modal } from '@app-elements/modal'
import { useStorePath } from '@app-elements/use-store-path'

import { setState } from '/store'

export function ExampleModal () {
  const [chosenPlan] = useStorePath(this.context.store, 'chosenPlan')
  const close = ev => {
    ev.preventDefault()
    setState({ modal: null })
  }
  return (
    <Modal className='styled-modal small'>
      <div className='modal-header'>
        <h2>Subscribe</h2>
      </div>
      <form action=''>
        <div className='modal-scrollview'>
          <div className='content centered'>
            <h3>You chose the plan: {chosenPlan}</h3>
          </div>
          <div className='actions centered'>
            <button onClick={close} className='btn btn-ghost'>Cancel</button>
            <button onClick={close} className='btn'>Yes</button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
