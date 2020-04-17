import Form, { SubmitButton } from '@app-elements/form'
import { Link } from '@app-elements/router'

// import { Checkbox } from '/elements/checkbox'
import { TextInput } from '/elements/text-input'

export default function Login ({ formProps }) {
  return (
    <div className='container pt-10'>
      <div style={{ maxWidth: '320px' }}>
        <h2>Log in</h2>
        <Form {...formProps}>
          <TextInput label='Email Address' name='email' placeholder='Your Email' required isFormField />
          <TextInput type='password' label='Password' name='password' placeholder='Your Password' required isFormField />
          {/* <Checkbox label='Stay Logged in' name='remember' id='remember' value='remember' isFormField /> */}

          <SubmitButton className='btn'>Login</SubmitButton>
          <div className='pt-1'>
            <div className='field-hint'>
              Need an account? <Link name='signup'>Sign Up</Link>.
              <br />
              <Link name='forgotPassword'>Forgot password?</Link>
            </div>
          </div>
        </Form>
      </div>
    </div>
  )
}
