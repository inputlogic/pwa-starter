import Form, { ErrorOrHint } from '@app-elements/form'
import { routeTo } from '@app-elements/router'

const TextInput = ({ ...props }) =>
  <input type='text' {...props} />

const formProps = {
  name: 'Login',
  validations: {
    password: (val = '') =>
      val.length < 6 && 'Password must be greater than 6 characters!'
  },
  onSubmit: ({ hasError, errors, data, done }) => {
    console.log('onSubmit', { hasError, errors, data })
    if (!hasError) {
      routeTo('/', true)
      done() // clear form data and errors
    } else {
      // tell the form we are no longer submitting,
      // but keep the errors, and reset password value.
      done(errors, { ...data, password: null })
    }
  }
}

const Login = () =>
  <Form {...formProps}>
    <TextInput required name='email' placeholder='Your Email' />
    <TextInput required type='password' name='password' placeholder='Your Password' />
    <ErrorOrHint name='password' />
    <button type='submit'>Login</button>
  </Form>

export default Login
