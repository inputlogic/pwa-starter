import Form, { ErrorOrHint, SubmitButton } from '@app-elements/form'

export default function Login ({ formProps }) {
  return (
    <Form {...formProps}>
      <input type='text' name='email' placeholder='Your Email' required isFormField />
      <input type='password' name='password' placeholder='Your Password' required isFormField />
      <ErrorOrHint name='password' />
      <input type='checkbox' name='remember' isFormField />
      <SubmitButton>Login</SubmitButton>
    </Form>
  )
}
