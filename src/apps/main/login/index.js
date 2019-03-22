// We will utilize the `form` and `router` packages from `@app-elements.`
import Form, { ErrorOrHint, SubmitButton } from '@app-elements/form'
import { routeTo } from '@app-elements/router'

// Here is a simple text input for our form. When nested under a `<Form />`
// it will be assigned an `onChange` function in it's props, which will sync
// the input value to the global state.
const TextInput = ({ ...props }) =>
  <input type='text' {...props} />

const Checkbox = (props) =>
  <input type='checkbox' n{...props} />

// No we define our Form props. Every Form requires a `name`. We also include
// the optional `validations` prop and an `onSubmit`. For more informaiton on the
// props you can pass, see the [`<Form />` docs](https://github.com/inputlogic/elements/tree/master/components/form)
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

// And our page Component that renders our login `<Form />`.
const Login = () =>
  <Form {...formProps}>
    <TextInput required name='email' placeholder='Your Email' />
    <TextInput required type='password' name='password' placeholder='Your Password' />
    <ErrorOrHint name='password' />
    <Checkbox name='remember' />
    <SubmitButton>Login</SubmitButton>
  </Form>

export default Login
