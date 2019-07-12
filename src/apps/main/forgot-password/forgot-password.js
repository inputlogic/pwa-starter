import Form, { SubmitButton } from '@app-elements/form'
import { Link } from '@app-elements/router'

export default function ForgotPassword ({ formProps }) {
  return (
    <div>
      <h2>Forgot password</h2>
      <Form {...formProps}>
        <input type='text' name='email' placeholder='Your Email' required isFormField />
        <SubmitButton>ForgotPassword</SubmitButton>
        <div>
          <span className='field-hint'>
            Have an account? <Link name='login'>Log in</Link>.
          </span>
        </div>
      </Form>
    </div>
  )
}
