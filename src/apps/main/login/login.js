import Form, { ErrorOrHint, SubmitButton } from '@app-elements/form'
import { Link } from '@app-elements/router'

export default function Login ({ formProps }) {
  return (
    <div className='container'>
      <h2>Log in</h2>
      <Form {...formProps}>
        <input type='text' name='email' placeholder='Your Email' required isFormField />
        <input type='password' name='password' placeholder='Your Password' required isFormField />
        <ErrorOrHint name='password' isFormField />
        <input type='checkbox' name='remember' isFormField />
        <SubmitButton>Login</SubmitButton>
        <div>
          <span className='field-hint'>
            Need an account? <Link name='signup'>Sign Up</Link>.
            <br />
            <Link name='forgotPassword'>Forgot password?</Link>
          </span>
        </div>
      </Form>
    </div>
  )
}
