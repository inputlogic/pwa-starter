import { useState, useMemo } from 'preact/hooks'
import { RouteTo } from '@app-elements/router'

import LoginBase from './login'

export default function Login () {
  // We'll use local state to manage when we have successfully logged in.
  const [isSuccess, setSuccess] = useState(false)

  // If we have logged in successfully, use RouteTo to navigate to a new page.
  if (isSuccess) {
    return <RouteTo name='users' />
  }

  // Now we define our Form props. Every Form requires a `name`. We also include
  // the optional `validations` prop and an `onSubmit`. For more informaiton on the
  // props you can pass, see the [`<Form />` docs](https://github.com/inputlogic/elements/tree/master/components/form)
  const formProps = useMemo(() => ({
    name: 'Login',
    validations: {
      password: (val = '') =>
        val.length < 6 && 'Password must be greater than 6 characters!'
    },
    onSubmit: ({ hasError, errors, data, done }) => {
      if (!hasError) {
        setSuccess(true)
        done() // clear form data and errors
      } else {
        // tell the form we are no longer submitting,
        // but keep the errors, and reset password value.
        done(errors, { ...data, password: null })
      }
    }
  }), [])

  return (
    <LoginBase formProps={formProps} />
  )
}
