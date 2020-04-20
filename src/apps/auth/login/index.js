import { useState, useMemo } from 'preact/hooks'
import { RouteTo } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'
import { useMappedState } from '@app-elements/use-mapped-state'

import store, { dispatch, set } from '/store'
import url from '/util/url'

import LoginBase from './login'

export default function Login () {
  // We'll use local state to manage when we have successfully logged in.
  const [isSuccess, setSuccess] = useState(false)

  // We can use the 'next' argument to redirect back to the user's destination once they are authorized
  const redirect = useMappedState(store, state => state.currentRoute.args.next)

  // If we have logged in successfully, use RouteTo to navigate to a new page.
  if (isSuccess) {
    return (
      redirect
        ? <RouteTo url={redirect} />
        : <RouteTo name='users' />
    )
  }

  // Now we define our Form props. Every Form requires a `name`. We also include
  // the optional `validations` prop and an `onSubmit`. For more informaiton on the
  // props you can pass, see the [`<Form />` docs](https://github.com/inputlogic/elements/tree/master/components/form)
  const formProps = useMemo(() => ({
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
      dispatch(
        set('token', token),
        set('userId', userId)
      )
      setSuccess(true)
    },
    onFailure: (err) => {
      console.error('Login', { err })
      showNotification({
        message: 'We were not able to log you in!'
      })
    }
  }), [])

  return (
    <LoginBase formProps={formProps} />
  )
}
