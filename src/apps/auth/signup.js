import { useRouter, Link } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'
import { useForm } from '@app-elements/use-form'
import { LoadingIndicator } from '@app-elements/loading-indicator'

import { TextInput } from '/elements/text-input'
import { setState } from '/store'
import { url } from '/util/url'

export function SignUp () {
  const { routeTo } = useRouter()
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
      showNotification({
        type: 'success',
        message: 'Your account has been created!'
      })
      routeTo(url('app'))
    },
    onFailure: (err) => {
      console.error('SignUp', { err })
      showNotification({
        message: 'We were not able to create an account for you!'
      })
    }
  })

  return (
    <div className='container pt-10'>
      <div className='flex justify-content-around'>
        <div className='w-third'>
          <h2>Sign up</h2>
          <form onSubmit={submit}>
            <TextInput label='Email Address' placeholder='Your Email' required {...field('email')} />
            <TextInput type='password' label='Password' placeholder='Your Password' required {...field('password')} />
            <button type='submit' className='btn' disabled={isSubmitting}>
              {isSubmitting
                ? <LoadingIndicator />
                : 'Sign Up'}
            </button>
            <div className='pt-1'>
              <span className='field-hint'>
                <Link name='login'>Have an account? Log in.</Link>
                <br />
                <Link name='forgotPassword'>Forgot password?</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
