import { useState } from 'react'
import { RouteTo, Link } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'
import Form, { SubmitButton } from '@app-elements/form'

import { TextInput } from '/elements/text-input'

import { setState } from '/store'
import { url } from '/util/url'

export function SignUp () {
  const [isSuccess, setSuccess] = useState(false)

  // If we have signed in successfully, use RouteTo to navigate to a new page.
  if (isSuccess) {
    return <RouteTo name='app' />
  }

  const formProps = {
    name: 'SignUp',
    action: url('api.signup'),
    method: 'post',
    noAuth: true,
    validations: {
      password: (val = '') =>
        val.length < 6 && 'Password must be greater than 6 characters!'
    },
    onSuccess: ({ token, userId }) => {
      window.localStorage.setItem('token', token)
      setState({ token, userId })
      setSuccess(true)
      showNotification({
        type: 'success',
        message: 'Your account has been created!'
      })
    },
    onFailure: (err) => {
      console.error('SignUp', { err })
      showNotification({
        message: 'We were not able to create an account for you!'
      })
    }
  }

  return (
    <div className='container pt-10'>
      <div className='flex justify-content-around'>
        <div className='w-third'>
          <h2>Sign up</h2>
          <Form {...formProps}>
            <TextInput label='Email Address' name='email' placeholder='Your Email' required isFormField />
            <TextInput type='password' label='Password' name='password' placeholder='Your Password' required isFormField />
            <SubmitButton className='btn'>Sign Up</SubmitButton>
            <div className='pt-1'>
              <span className='field-hint'>
                <Link name='login'>Have an account? Log in.</Link>
                <br />
                <Link name='forgotPassword'>Forgot password?</Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
