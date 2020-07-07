import { Modals } from '@app-elements/modal'
import { useStorePath } from '@app-elements/use-store-path'

import { ExampleModal } from '/modals/example-modal'

export function AllModals () {
  const [modal, setModal] = useStorePath(this.context.store, 'modal')
  return (
    <Modals value={modal} syncState={setModal}>
      <ExampleModal />
    </Modals>
  )
}
