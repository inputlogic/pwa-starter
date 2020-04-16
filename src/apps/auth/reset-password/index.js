import { routeTo } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'

import url from '/util/url'

import ResetPasswordBase from './reset-password'

export default function ResetPassword ({ resetToken, userId }) {
  const formProps = {
    name: 'ResetPassword',
    initialData: {
      token: resetToken,
      userId
    },
    action: url('api.resetPassword'),
    method: 'post',
    noAuth: true,
    validations: {
      password: (val = '') =>
        val.length < 6 && 'Password must be greater than 6 characters!'
    },
    onSuccess: (result) => {
      showNotification({
        type: 'success',
        message: 'Password successfully changed!'
      })
      routeTo(url('login'))
    },
    onFailure: ({ err }) => {
      console.error('PasswordReset', { err })
      showNotification({
        message: err.message || 'Could not reset password.'
      })
      routeTo(url('forgotPassword'))
    }
  }

  return <ResetPasswordBase formProps={formProps} />
}
