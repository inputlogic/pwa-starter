import Form, { SubmitButton } from '@app-elements/form'
import { Link } from '@app-elements/router'

import { TextInput } from '/elements/text-input'

export default function ForgotPassword ({ formProps, isSuccess }) {
  return (
    <div className='container pt-10'>
      <div style={{ maxWidth: '320px' }}>
        <h2>Forgot password</h2>
        {isSuccess
          ? <p>Please check your email to reset your password.</p>
          : <Form {...formProps}>
            <TextInput label='Email Address' name='email' placeholder='Your Email' required isFormField />
            <SubmitButton className='btn'>Forgot Password</SubmitButton>
            <div className='pt-1'>
              <span className='field-hint'>
              Have an account? <Link name='login'>Log in</Link>.
              </span>
            </div>
          </Form>
        }
      </div>
    </div>
  )
}
