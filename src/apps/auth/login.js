import W from 'wasmuth'
import { useRouter } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'

import { url } from '/util/url'
import { LoginForm } from './elements/login-form'

export function Login () {
  const router = useRouter()
  const redirect = W.path('route.args.next', router)

  const onSuccess = () => router.routeTo(redirect || url('app'))
  const onFailure = () => showNotification({ message: 'We were not able to log you in!' })

  return (
    <div className='container pt-10'>
      <div className='flex justify-content-around'>
        <div className='w-third'>
          <h2>Log in</h2>
          <LoginForm onSuccess={onSuccess} onFailure={onFailure} />
        </div>
      </div>
    </div>
  )
}
