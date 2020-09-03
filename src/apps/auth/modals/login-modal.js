import W from 'wasmuth'
import { Modal } from '@app-elements/modal'
import { showNotification } from '@app-elements/notification'
import { useRouter } from '@app-elements/router'

import { url } from '/util/url'
import { setState } from '/store'
import { LoginForm } from '../elements/login-form'

export function LoginModal () {
  // We can use the 'next' argument to redirect back to the user's destination
  const router = useRouter()
  const redirect = W.path('route.args.next', router)

  const onSuccess = () => {
    setState({ modal: null })
    router.routeTo(redirect || url('app'))
  }

  const onFailure = () =>
    showNotification({ message: 'We were not able to log you in!' })

  return (
    <Modal className='styled-modal small'>
      <div className='modal-header'>
        <h2>Sign In</h2>
      </div>
      <div className='container pb-1'>
        <LoginForm onSuccess={onSuccess} onFailure={onFailure} />
      </div>
    </Modal>
  )
}
