import { useState, useMemo } from 'preact/hooks'
import { showNotification } from '@app-elements/notification'

import ForgotPasswordBase from './forgot-password'
import url from '/util/url'

export default function ForgotPassword () {
  const [isSuccess, setSuccess] = useState(false)

  const formProps = useMemo(() => ({
    name: 'ForgotPassword',
    action: url('api.forgotPassword'),
    method: 'post',
    noAuth: true,
    onSuccess: () => {
      setSuccess(true)
    },
    onFailure: (err) => {
      console.error('ForgotPassword', { err })
      showNotification({
        message: 'Something went wrong!'
      })
    }
  }), [])

  return (
    <ForgotPasswordBase formProps={formProps} isSuccess={isSuccess} />
  )
}
