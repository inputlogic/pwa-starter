import W from 'wasmuth'
import { useRouter } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'

import { setState } from '/store'
import { url } from '/util/url'
import { SignUpForm } from './elements/signup-form'

export function SignUp () {
  const router = useRouter()
  const redirect = W.path('route.args.next', router)

  const onSuccess = () => {
    setState({ modal: null })
    showNotification({
      type: 'success',
      message: 'Your account has been created!'
    })
    router.routeTo(redirect || url('app'))
  }

  const onFailure = () =>
    showNotification({ message: 'We were not able to create an account for you!' })

  return (
    <div className='container pt-10'>
      <div className='flex justify-content-around'>
        <div className='w-third'>
          <h2>Sign up</h2>
          <SignUpForm onSuccess={onSuccess} onFailure={onFailure} />
        </div>
      </div>
    </div>
  )
}
