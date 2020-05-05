import { useState } from 'react'
import { showNotification } from '@app-elements/notification'
import Form, { SubmitButton } from '@app-elements/form'
import { Link } from '@app-elements/router'

import { TextInput } from '/elements/text-input'

import url from '/util/url'

export function ForgotPassword () {
  const [isSuccess, setSuccess] = useState(false)

  const formProps = {
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
  }

  return (
    <div className='container pt-10'>
      <div className='flex justify-content-around'>
        <div className='w-third'>
          <h2>Forgot password</h2>
          {isSuccess
            ? <p>Please check your email to reset your password.</p>
            : (
              <Form {...formProps}>
                <TextInput label='Email Address' name='email' placeholder='Your Email' required isFormField />
                <SubmitButton className='btn'>Forgot Password</SubmitButton>
                <div className='pt-1'>
                  <span className='field-hint'>
                  Have an account? <Link name='login'>Log in</Link>.
                  </span>
                </div>
              </Form>
            )}
        </div>
      </div>
    </div>
  )
}
