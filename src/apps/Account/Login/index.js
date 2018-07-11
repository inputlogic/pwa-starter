import Form from '/hoc/Form'

const TextInput = ({...props}) =>
  <input type='text' {...props} />

export default () =>
  <Form name='Login' onSubmit={(form) => console.log('form', form)}>
    cool
    <TextInput required name='email' placeholder='Your Email' />
    <TextInput required type='password' name='password' placeholder='Your Password' />
    <button type='submit'>Login</button>
  </Form>
