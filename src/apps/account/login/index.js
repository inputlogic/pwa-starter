import Form from '@app-elements/form'

const TextInput = ({ ...props }) =>
  <input type='text' {...props} />

const Login = () =>
  <Form name='Login' onSubmit={(form) => console.log('form', form)}>
    cool
    <TextInput required name='email' placeholder='Your Email' />
    <TextInput required type='password' name='password' placeholder='Your Password' />
    <button type='submit'>Login</button>
  </Form>

export default Login
