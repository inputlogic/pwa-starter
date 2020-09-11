import { Modals } from '@app-elements/modal'

import { LoginModal } from '/apps/auth/modals/login-modal'
import { SignUpModal } from '/apps/auth/modals/signup-modal'
import { useStorePath } from '/store/hooks'

export function AllModals () {
  const [modal, setModal] = useStorePath('modal')

  return (
    <Modals value={modal} syncState={setModal}>
      <LoginModal />
      <SignUpModal />
    </Modals>
  )
}
