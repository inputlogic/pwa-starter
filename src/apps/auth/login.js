import { useState } from 'react'
import { RouteTo, Link } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'
import { useMappedState } from '@app-elements/use-mapped-state'
import Form, { SubmitButton } from '@app-elements/form'

import { TextInput } from '/elements/text-input'

import { url } from '/util/url'

export function Login () {
  const { store } = this.context
  const [isSuccess, setSuccess] = useState(false)

  // We can use the 'next' argument to redirect back to the user's destination
  const redirect = useMappedState(store, state => state.currentRoute.args.next)

  if (isSuccess) {
    return redirect
      ? <RouteTo url={redirect} />
      : <RouteTo name='app' />
  }

  const formProps = {
    name: 'Login',
    action: url('api.login'),
    method: 'post',
    noAuth: true,
    validations: {
      password: (val = '') =>
        val.length < 6 && 'Password must be greater than 6 characters!'
    },
    onSuccess: ({ token, userId }) => {
      window.localStorage.setItem('token', token)
      store.setState({ token, userId })
      setSuccess(true)
    },
    onFailure: (err) => {
      console.error('Login', { err })
      showNotification({
        message: 'We were not able to log you in!'
      })
    }
  }

  return (
    <div className='container pt-10'>
      <div className='flex justify-content-around'>
        <div className='w-third'>
          <h2>Log in</h2>
          <Form {...formProps}>
            <TextInput label='Email Address' name='email' placeholder='Your Email' required isFormField />
            <TextInput type='password' label='Password' name='password' placeholder='Your Password' required isFormField />
            <SubmitButton className='btn'>Login</SubmitButton>
            <div className='pt-1'>
              <div className='field-hint'>
                <Link name='signup'>Need an account? Sign Up.</Link>
                <br />
                <Link name='forgotPassword'>Forgot password?</Link>
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
