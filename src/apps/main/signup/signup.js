import Form, { ErrorOrHint, SubmitButton } from '@app-elements/form'
import { Link } from '@app-elements/router'

export default function SignUp ({ formProps }) {
  return (
    <div className='container  pt-7'>
      <h2>Sign up</h2>
      <Form {...formProps}>
        <input type='text' name='email' placeholder='Your Email' required isFormField />
        <input type='password' name='password' placeholder='Your Password' required isFormField />
        <ErrorOrHint name='password' isFormField />
        <SubmitButton>SignUp</SubmitButton>
        <div>
          <span className='field-hint'>
            Have an account? <Link name='login'>Log in</Link>.
            <br />
            <Link name='forgotPassword'>Forgot password?</Link>
          </span>
        </div>
      </Form>
    </div>
  )
}
