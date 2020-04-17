import Form, { SubmitButton } from '@app-elements/form'
import { Link } from '@app-elements/router'

import { TextInput } from '/elements/text-input'

export default function SignUp ({ formProps }) {
  return (
    <div className='container pt-10'>
      <div style={{ maxWidth: '320px' }}>
        <h2>Sign up</h2>
        <Form {...formProps}>
          <TextInput label='Email Address' name='email' placeholder='Your Email' required isFormField />
          <TextInput type='password' label='Password' name='password' placeholder='Your Password' required isFormField />
          <SubmitButton className='btn'>SignUp</SubmitButton>
          <div className='pt-1'>
            <span className='field-hint'>
            Have an account? <Link name='login'>Log in</Link>.
              <br />
              <Link name='forgotPassword'>Forgot password?</Link>
            </span>
          </div>
        </Form>
      </div>
    </div>
  )
}
