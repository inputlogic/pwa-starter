import { Link } from '@app-elements/router'
import { LoadingIndicator } from '@app-elements/loading-indicator'
import { useForm } from '@app-elements/use-form'

import { TextInput } from '/elements/text-input'
import { url } from '/util/url'
import { setState } from '/store'

export function SignUpForm ({ onSuccess, onFailure }) {
  const { submit, field, isSubmitting } = useForm({
    action: url('api.signup'),
    validations: {
      email: s => !s && 'Please provide your email address.',
      password: s => (!s || s.length < 6) && 'Password must be at least 6 characters'
    },
    onSuccess: ({ response }) => {
      const { token, userId } = response
      window.localStorage.setItem('token', token)
      setState({ token, userId })
      onSuccess && onSuccess(response)
    },
    onFailure: (err) => {
      console.error('SignUp', { err })
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
          : 'Sign up'}
      </button>
      <div className='pt-1'>
        <div className='field-hint'>
          <Link name='login'>Have an account? Log in.</Link>
          <br />
          <Link name='forgotPassword'>Forgot password?</Link>
        </div>
      </div>
    </form>
  )
}
