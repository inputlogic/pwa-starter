import { Modals } from '@app-elements/modal'

import { ExampleModal } from '/modals/example-modal'
import { useStorePath } from '/store/hooks'

export function AllModals () {
  const [modal, setModal] = useStorePath('modal')

  return (
    <Modals value={modal} syncState={setModal}>
      <ExampleModal />
    </Modals>
  )
}
