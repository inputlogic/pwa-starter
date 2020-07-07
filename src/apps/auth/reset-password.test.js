/* eslint-disable */

jest.mock('@app-elements/use-form')

import { render } from 'preact'
import { useForm } from '@app-elements/use-form'
import { RouteProvider } from '@app-elements/router'

import { ResetPassword } from './reset-password.js'
import { routes } from './index.js'

const { useForm: useFormOrig } = jest.requireActual('@app-elements/use-form')

test('ResetPassword exports', () => {
  expect(typeof ResetPassword).toBe('function')
})

test('ResetPassword should submit with data', () => { 
  // Mock useForm, so it doesn't submit and hit an endpoint
  // as we don't want to test the endpoint here.
  const submit = jest.fn(ev => ev.preventDefault())
  useForm.mockImplementation(input => {
    const ret = useFormOrig(input)
    ret.submit = submit
    return ret
  })

  render(
    <RouteProvider routes={routes}>
      <ResetPassword />
    </RouteProvider>,
    document.body
  )

  const form = document.body.querySelector('form')
  const token = document.body.querySelector('input[name="token"]')
  const userid = document.body.querySelector('input[name="user_id"]')
  const password = document.body.querySelector('input[name="password"]')

  expect(form).toBeDefined()
  expect(token).toBeDefined()
  expect(userid).toBeDefined()
  expect(password).toBeDefined()
  expect(submit).not.toBeCalled()

  token.value = '123'
  userid.value = '5'
  password.value = 'newpass'
  form.submit()

  expect(submit).toBeCalled()
})


