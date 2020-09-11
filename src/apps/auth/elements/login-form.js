import { Link } from '@app-elements/router'
import { LoadingIndicator } from '@app-elements/loading-indicator'
import { useForm } from '@app-elements/use-form'

import { TextInput } from '/elements/text-input'
import { url } from '/util/url'
import { setState } from '/store'

export function LoginForm ({ onSuccess, onFailure }) {
  const { submit, field, isSubmitting } = useForm({
    action: url('api.login'),
    validations: {
      password: (val = '') =>
        val.length < 6 && 'Password must be greater than 6 characters!'
    },
    onSuccess: ({ response }) => {
      const { token, userId } = response
      window.localStorage.setItem('token', token)
      setState({ token, userId })
      onSuccess && onSuccess(response)
    },
    onFailure: (err) => {
      console.error('Login', { err })
      onFailure && onFailure(err)
    }
  })

  return (
    <form onSubmit={submit}>
      <TextInput label='Email Address' placeholder='Your Email' required {...field('email')} />
      <TextInput type='password' label='Password' placeholder='Your Password' required {...field('password')} />
      <button type='submit' className='btn' disabled={isSubmitting}>
        {isSubmitting
          ? <LoadingIndicator />
          : 'Log in'}
      </button>
      <div className='pt-1'>
        <div className='field-hint'>
          <Link to='signup'>Need an account? Sign Up.</Link>
          <br />
          <Link to='forgotPassword'>Forgot password?</Link>
        </div>
      </div>
    </form>
  )
}
