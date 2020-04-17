import { useState, useMemo } from 'preact/hooks'
import { RouteTo } from '@app-elements/router'
import { showNotification } from '@app-elements/notification'

import { dispatch, set } from '/store'
import url from '/util/url'

import SignUpBase from './signup'

export default function SignUp () {
  // We'll use local state to manage when we have successfully signed in.
  const [isSuccess, setSuccess] = useState(false)

  // If we have signed in successfully, use RouteTo to navigate to a new page.
  if (isSuccess) {
    return <RouteTo name='users' />
  }

  // Now we define our Form props. Every Form requires a `name`. We also include
  // the optional `validations` prop and an `onSubmit`. For more informaiton on the
  // props you can pass, see the [`<Form />` docs](https://github.com/inputlogic/elements/tree/master/components/form)
  const formProps = useMemo(() => ({
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
      dispatch(
        set('token', token),
        set('userId', userId)
      )
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
  }), [])

  return (
    <SignUpBase formProps={formProps} />
  )
}
