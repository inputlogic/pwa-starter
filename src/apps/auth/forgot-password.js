import { useState } from 'react'
import { Link } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'
import { useForm } from '@app-elements/use-form'
import { LoadingIndicator } from '@app-elements/loading-indicator'

import { TextInput } from '/elements/text-input'
import { url } from '/util/url'

export function ForgotPassword () {
  const [isSuccess, setIsSuccess] = useState(false)
  const { submit, field, clear, isSubmitting } = useForm({
    action: url('api.forgotPassword'),
    validations: {
      email: s => !s && 'Please provide your email address.',
    },
    onSuccess: () => {
      clear()
      setIsSuccess(true)
    },
    onFailure: (err) => {
      console.error('ForgotPassword', { err })
      showNotification({ message: 'Something went wrong' })
    }
  })

  return (
    <div className='container pt-10'>
      <div className='flex justify-content-around'>
        <div className='w-third'>
          <h2>Forgot password</h2>
          {isSuccess
            ? <p>Please check your email to reset your password.</p>
            : (
              <form onSubmit={submit}>
                <TextInput label='Email Address' placeholder='Your Email' required {...field('email')} />
                <button type='submit' className='btn' disabled={isSubmitting}>
                  {isSubmitting
                    ? <LoadingIndicator />
                    : 'Forgot Password'}
                </button>
                <div className='pt-1'>
                  <span className='field-hint'>
                    <Link name='login'>Have an account? Log in.</Link>
                  </span>
                </div>
              </form>
            )}
        </div>
      </div>
    </div>
  )
}
