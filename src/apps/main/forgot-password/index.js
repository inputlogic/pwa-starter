import { useState, useMemo } from 'preact/hooks'
import { RouteTo } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'

import ForgotPasswordBase from './forgot-password'

export default function ForgotPassword () {
  const [isSuccess, setSuccess] = useState(false)

  if (isSuccess) {
    return <RouteTo name='users' />
  }

  const formProps = useMemo(() => ({
    name: 'ForgotPassword',
    action: 'http://www.mocky.io/v2/5d28e8362c000068003edca8',
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
