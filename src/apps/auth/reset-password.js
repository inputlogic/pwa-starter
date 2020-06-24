import { useRouter } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'
import Form, { SubmitButton } from '@app-elements/form'

import { TextInput } from '/elements/text-input'
import { url } from '/util/url'

export function ResetPassword ({ resetToken, userId }) {
  const { routeTo } = useRouter()

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

  return (
    <div className='container pt-10'>
      <div className='flex justify-content-around'>
        <div className='w-third'>
          <h2>Reset Password</h2>
          <Form {...formProps}>
            <TextInput hidden name='token' />
            <TextInput hidden name='user_id' />
            <TextInput type='password' name='password' placeholder='Your New Password' isFormField Required />
            <SubmitButton className='btn'>Change Password</SubmitButton>
          </Form>
        </div>
      </div>
    </div>
  )
}
