import Form from '@app-elements/form'
import { routeTo } from '@app-elements/router'

const TextInput = ({ ...props }) =>
  <input type='text' {...props} />

const handleSubmit = (form) => {
  routeTo('/', true)
}

const Login = () =>
  <Form name='Login' onSubmit={handleSubmit}>
    cool
    <TextInput required name='email' placeholder='Your Email' />
    <TextInput required type='password' name='password' placeholder='Your Password' />
    <button type='submit'>Login</button>
  </Form>

export default Login
