import { useRouter } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'
import { useForm } from '@app-elements/use-form'
import { LoadingIndicator } from '@app-elements/loading-indicator'

import { TextInput } from '/elements/text-input'
import { url } from '/util/url'

export function ResetPassword ({ resetToken, userId }) {
  const { routeTo } = useRouter()
  const { submit, field, isSubmitting } = useForm({
    action: url('api.resetPassword'),
    initialData: {
      token: resetToken,
      userId
    },
    validations: {
      password: (val = '') =>
        val.length < 6 && 'Password must be greater than 6 characters!'
    },
    onSuccess: () => {
      showNotification({
        type: 'success',
        message: 'Password successfully changed!'
      })
      routeTo(url('login'))
    },
    onFailure: ({ err }) => {
      console.error('PasswordReset', { err })
      showNotification({ message: err.message || 'Could not reset password.' })
      routeTo(url('forgotPassword'))
    }
  })

  return (
    <div className='container pt-10'>
      <div className='flex justify-content-around'>
        <div className='w-third'>
          <h2>Reset Password</h2>
          <form onSubmit={submit}>
            <TextInput hidden {...field('token')} />
            <TextInput hidden {...field('user_id')} />
            <TextInput type='password' placeholder='Your New Password' required {...field('password')} />
            <button type='submit' className='btn' disabled={isSubmitting}>
              {isSubmitting
                ? <LoadingIndicator />
                : 'Change Password'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
