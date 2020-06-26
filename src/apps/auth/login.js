import W from 'wasmuth'
import { Link, useRouter } from '@app-elements/router'
import { LoadingIndicator } from '@app-elements/loading-indicator'
import { showNotification } from '@app-elements/notification'
import { useForm } from '@app-elements/use-form'

import { TextInput } from '/elements/text-input'
import { url } from '/util/url'
import { setState } from '/store'

export function Login () {
  // We can use the 'next' argument to redirect back to the user's destination
  const router = useRouter()
  const redirect = W.path('route.args.next', router)

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
      router.routeTo(redirect || url('app'))
    },
    onFailure: (err) => {
      console.error('Login', { err })
      showNotification({
        message: 'We were not able to log you in!'
      })
    }
  })

  return (
    <div className='container pt-10'>
      <div className='flex justify-content-around'>
        <div className='w-third'>
          <h2>Log in</h2>
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
        </div>
      </div>
    </div>
  )
}
