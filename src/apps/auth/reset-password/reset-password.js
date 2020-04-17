import Form, { SubmitButton } from '@app-elements/form'

import { TextInput } from '/elements/text-input'

export default function ResetPassword ({ formProps }) {
  return (
    <div className='container pt-10'>
      <div style={{ maxWidth: '320px' }}>
        <h2>Reset Password</h2>
        <Form {...formProps}>
          <TextInput hidden name='token' />
          <TextInput hidden name='user_id' />
          <TextInput type='password' name='password' placeholder='Your New Password' isFormField Required />
          <SubmitButton className='btn'>Change Password</SubmitButton>
        </Form>
      </div>
    </div>
  )
}
